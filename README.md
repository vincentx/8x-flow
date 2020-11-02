# 8X-Flow


## 注意事项
1. 8X-Flow 首先是基于yaml 文件的，所以，yaml 文件必须正确，可以通过 [yaml 验证器](https://codebeautify.org/yaml-validator) ，验证 yaml 文件正确
2. 建议小步迭代，每写一个部分，就在 [模型查看器](https://vincentx.github.io/8x-flow/#) 验证，然后下一部分，比如说，第一步 RFP；第二步 Proposal；第三步 Contract
3. 如果想看更加细节的 DSL 实现，可以 [参考源码](https://github.com/vincentx/8x-flow/tree/master/packages/yaml-script/src) ，具体的模型定义 [可以参考](https://github.com/vincentx/8x-flow/blob/master/packages/yaml-script/src/json.js)

## DSL Overview
本质上，yaml 文件声明各种模型和关系，比如拿最简单的合同来说
```yaml
- rfp: Price Request
  key_timestamps: created_at

- proposal: Price Proposal
  key_timestamps: created_at

- contract: Order
  key_timestamps: created_at

- evidence: Shipping Order
  key_timestamps: created_at
```

这个 yaml 文件里定义了合同的四个部分，rfp、proposal、contract 以及 evidence，这都是一个常见的合同中的必备元素。如果把这个 yaml 文件拿到 [模型查看器](https://vincentx.github.io/8x-flow/#)，可以看到，四个合同部分，但是他们之间的关系由于还没有建模，因此看不到：
![enter image description here](https://blog-image-1258275666.cos.ap-chengdu.myqcloud.com/Graph-No-Relations.png)

## 合同建模

下面出现的yaml文件每一个都可以单独渲染。

### RFP
案例一（订单）：
```yaml
- rfp: Order Request
  key_timestamps: placed_at
  participants: _Customers
  details:
    Order Item:
      key_data: amount
      evidences: SKU

- evidence: SKU
  key_timestamps: shelved_at
  key_data: price
```
案列二（竞标广告）
```yaml
- rfp: Advertisement Request
  key_timestamps: placed_at
  participants: _Advertisement Specialist
  details:
    - Display Position:
        key_data: page_location, display_mode
    - Display Duration:
        key_data: start_at, price_per_day
```
- RFP 需要描述标的物，即甲方需要乙方提供什么服务或者物品，上述案例中是商品
- RFP 必须包含字段 key_timestamps
- participants，RFP 参与方可以有多个，如果以下划线开头，表示角色，否则表示标的物、场所或者参与方
- details 表示 RFP 中的要求列表，可以是数组，每一个都可以定义 key_data，也可以指向别的 evidence

### Proposal
案例一（订单）：
```yaml
- proposal: Order Proposal
  key_timestamps: proposed_at
  evidences: Order Request
  participants: _Inventory Manager
  details:
    - Order Item
    - Back Order Item:
        key_data: amount
        evidences: SKU
- evidence: SKU
  key_timestamps: shelved_at
  key_data: price
```
案列二（竞标广告）
```yaml
- proposal: House Advertisement Proposal
  key_timestamps: proposed_at
  evidences: Advertisement Request
  participants: _Advertisement Specialist
  details:
    - Display Position:
        key_data: page_location, display_mode
    - Display Duration:
        key_data: start_at, price_per_day
    - Channel:
        key_data: media_provider
```

- Proposal 中的 evidence 可以指向 rfp
- 通常 proposal details 中的内容会比 rfp 中多，rfp 中甲方关心最终标的物，proposal 中乙方不仅仅要列出最终标的物，且需要列出中间过程中比较重要的标的物
- 其他字段同 FRP

### Contract
案例一（订单）
```yaml
- contract: Order
  key_timestamps: placed_at
  participants: _Customer, Account, Address
  details:
    - Order Item
    - Back Order Item
  fulfillment:
    - Order Payment:
        request:
          participants: Account
        confirm:
          variform: yes
    - Shipment:
        request:
          participants: Address
        confirm:
          evidences: Shipment
```
案列二（竞价广告）
```yaml
- contract: Advertisement Order
  key_timestamps: placed_at
  participants: _HouseOwner, Account, RegisteredUser
  details:
    - Display Position:
        key_data: page_location, display_mode
    - Display Duration:
        key_data: start_at, price_per_day
    - Channel:
        key_data: media_provider
  fulfillment:
    - Advertisement Order Payment:
        request:
          participants: _HouseOwner, Account
        confirm:
          variform: yes
    - Advertisement Display:
        request:
          participants: _Position, House Description
        confirm:
          evidences: PublicPages
```
- Contract 中最重要的是 fulfillment，可以是数组，一个完整的 fulfillment 从 request 开始，confirm 结束，其中confirm 有两种方式，直接使用某种证据（evidences）或者通过甲乙方确认(variform)；variform 的方式可以使得甲乙方确认凭证作为角色，和其他角色或者合同产生关联
- 其他字段同上
- 每一个 fulfillment 都会产生 Request/Confirmation 凭证（evidence），如果要补充更多的数据或者如果要补充他们和其他角色的关系，可以在增加 evidences 进一步阐释，比方说 案例一的如果要补充更多的细节：
```yaml
- contract: Order
  key_timestamps: placed_at
  participants: _Customer, Account, Address
  details:
    - Order Item
    - Back Order Item
  fulfillment:
    - Order Payment:
        request:
          participants: Account
        confirm:
          variform: yes
    - Shipment:
        request:
          participants: Address
        confirm:
          evidences: Shipment

- evidence: Shipment
  key_timestamps: shipped_at
  details:
    - Shipment Item:
        key_data: amount
        participants: Product

- evidence: Transaction
  key_timestamps: confirmed_at
  key_data: total
  plays: _Order Payment Confirmation
  participants: Customer, Account

- evidence: Online Payment Request
  key_timestamps: requested_at
  key_data: total
  participants: Customer

- evidence: Online Payment Confirmation
  evidences: Online Payment Request
  key_timestamps: confirmed_at
  key_data: total
  participants: _Online Payment
  plays: _Online Payment Confirmation

- thing: Product
  relates: SKU

- evidence: SKU
  key_timestamps: shelved_at
  key_data: price

- system: Online Payment
```
- Transaction 和 Online Payment Confirmation 作为证据 (evidence)，跟作为角色的 _Online Payment Confirmation(variform: yes) 产生互动
- 第三方系统（system）可以作为角色
- 标的物 Product 可以通过 thing 的方式生命
