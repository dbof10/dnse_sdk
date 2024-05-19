# DNSEClient TypeScript Library
DNSEClient is a TypeScript library for interacting with the DNSE services API. It provides methods for user authentication, fetching account information, and performing trading operations. This library aims to simplify the integration process for developers looking to leverage DNSE services.

### Features
1. User Authentication
2. Email OTP Handling
3. Fetch Trading Token
4. Retrieve Sub-Accounts
5. Get Account Balance
6. Get Loan Packages
7. Place Orders
8. List Orders
9. Cancel Orders
10. List Positions


### Installation
To use DNSEClient in your project, install it via npm:


```
npm install dnse-client
```

Initialize DNSEClient


```
const client = new DNSEClient();
```

User Authentication
Login with username and password to get an authentication token:

```
const token = await client.login("yourUsername", "yourPassword");
```

Request Email OTP
Request an email OTP using the authentication token:

```
await client.getEmailOtp(token);
```

Get Trading Token
Fetch a trading token using the OTP:

```
const tradingToken = await client.getTradingToken("yourOtp", "otpType", token);
```

Retrieve Sub-Accounts
Get a list of sub-account IDs:

```
const subAccounts = await client.subAccounts(token);
```

Get Account Balance
Fetch the account balance for a specific sub-account:

```
const accountBalance = await client.accountBalance("subAccountId", token);
```

Get Loan Packages
Retrieve loan packages for a specific sub-account and asset type:

```
const loanPackages = await client.getLoanPackages("subAccountId", "spot", token);
```

Place Order
Place an order for a specific sub-account:

```
const order = await client.placeOrder(
"subAccountId",
"symbol",
"buy",
100,
10.5,
"orderType",
12345,
"spot",
token,
tradingToken
);
```

List Orders
List all orders for a specific sub-account and asset type:

```
const orders = await client.orderList("subAccountId", "spot", token);
```

Cancel Order
Cancel a specific order:

```
await client.cancelOrder("orderId", "subAccountId", "spot", token, tradingToken);
```

List Positions
List all positions for a specific sub-account and asset type:

```
const positions = await client.positionList("subAccountId", "spot", token);
```

Contributing
We welcome contributions to improve DNSEClient. Please follow these steps to contribute:

Fork the repository.
Create a new branch with a descriptive name.
Make your changes and commit them.
Push your changes to your fork.
Submit a pull request with a detailed description of your changes.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Support
If you encounter any issues or have questions, feel free to open an issue on GitHub.

Acknowledgements
We thank the DNSE team for providing the API and documentation that made this library possible.

Feel free to use this template as a starting point for your project's README. Customize it as needed to fit your project's specific details and requirements.
