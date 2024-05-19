import { AccountBalance } from "./model/AccountBalance";
import { LoanPackage } from "./model/LoadPackage";
import { Order } from "./model/Order";
import { Position } from "./model/Position";

export class DNSEClient {

  async handleResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorData.message}`);
    }
    return response.json();
  }


  async login(userName: string, password: string): Promise<string> {
    const url = "https://services.entrade.com.vn/dnse-user-service/api/auth";
    const payload = { username: userName, password: password };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await this.handleResponse(response);
    return data.token;
  }

  async getEmailOtp(token: string): Promise<void> {
    const url = "https://services.entrade.com.vn/dnse-auth-service/api/email-otp";
    const headers = {
      "Authorization": "Bearer " + token,
    };

    await fetch(url, { headers });
  }

  async getTradingToken(otp: string, type: string, token: string): Promise<string> {
    const url = "https://services.entrade.com.vn/dnse-order-service/trading-token";
    const headers = {
      "Authorization": "Bearer " + token,
      ...(type === "smart" ? { "smart-otp": otp } : { "otp": otp }),
    };

    const response = await fetch(url, {
      method: "POST",
      headers,
    });
    const result = await this.handleResponse(response);
    return result.tradingToken;
  }

  async subAccounts(token: string): Promise<string[]> {
    const url = "https://services.entrade.com.vn/dnse-order-service/accounts";
    const headers = {
      "Authorization": "Bearer " + token,
    };

    const response = await fetch(url, { headers });
    const data = await this.handleResponse(response);
    return data.accounts.map((account: any) => account.id);
  }

  async accountBalance(id: string, token: string): Promise<AccountBalance> {
    const url = `https://services.entrade.com.vn/dnse-order-service/account-balances/${id}`;
    const headers = {
      "Authorization": "Bearer " + token,
    };

    const response = await fetch(url, { headers });
    return await this.handleResponse(response);
  }

  async getLoanPackages(subAccount: string, assetType: "spot" | "future", token: string): Promise<LoanPackage[]> {
    let url: string;
    if (assetType === "spot") {
      url = `https://services.entrade.com.vn/dnse-order-service/accounts/${subAccount}/loan-packages`;
    } else {
      url = `https://services.entrade.com.vn/dnse-order-service/accounts/${subAccount}/derivative-loan-packages`;
    }

    const headers = { "Authorization": `Bearer ${token}` };

    const response = await fetch(url, { headers });
    const result = await this.handleResponse(response);
    return result.loanPackages;
  }

  async placeOrder(
    subAccount: string,
    symbol: string,
    side: "buy" | "sell",
    quantity: number,
    price: number,
    orderType: string,
    loanPackageId: number,
    assetType: "spot" | "future",
    token: string,
    tradingToken: string,
  ): Promise<Order | null> {
    const sideCode = side === "buy" ? "NB" : "NS";

    let url: string;
    if (assetType === "spot") {
      url = "https://services.entrade.com.vn/dnse-order-service/v2/orders";
    } else {
      url = "https://services.entrade.com.vn/dnse-order-service/derivative/orders";
    }


    const headers = {
      "Authorization": `Bearer ${token}`,
      "Trading-Token": tradingToken,
    };

    const payload = {
      accountNo: subAccount,
      symbol,
      side: sideCode,
      quantity,
      price,
      orderType,
      loanPackageId,
    };
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    return await this.handleResponse(response);
  }

  async orderList(subAccount: string, assetType: "spot" | "future", token: string): Promise<Order[]> {
    let url: string;
    if (assetType === "spot") {
      url = `https://services.entrade.com.vn/dnse-order-service/v2/orders?accountNo=${subAccount}`;
    } else {
      url = `https://services.entrade.com.vn/dnse-order-service/derivative/orders?accountNo=${subAccount}`;
    }
    const headers = { "Authorization": `Bearer ${token}` };
    const response = await fetch(url, { headers });
    const result = await this.handleResponse(response);
    return result.orders;
  }

  async cancelOrder(orderId: string, subAccount: string, assetType: "spot" | "future",
                    token: string, tradingToken: string): Promise<void> {
    let url: string;
    if (assetType === "spot") {
      url = `https://services.entrade.com.vn/dnse-order-service/v2/orders/${orderId}?accountNo=${subAccount}`;
    } else {
      url = `https://services.entrade.com.vn/dnse-order-service/derivative/orders/${orderId}?accountNo=${subAccount}`;
    }

    const headers = {
      "Authorization": `Bearer ${token}`,
      "Trading-Token": tradingToken,
    };

    await fetch(url, {
      method: "DELETE",
      headers,
    });
  }

  async positionList(subAccount: string, assetType: "spot" | "future", token: string): Promise<Position> {

    let url: string;
    if (assetType === "spot") {
      url = `https://services.entrade.com.vn/dnse-deal-service/deals?accountNo=${subAccount}`;
    } else {
      url = `https://services.entrade.com.vn/dnse-derivative-core/deals?accountNo=${subAccount}`;
    }

    const headers = { "Authorization": `Bearer ${token}` };
    const response = await fetch(url, { headers });
    const result = await this.handleResponse(response);

    if (assetType === "spot") {
      return result.deals;
    } else {
      return result.data;
    }
  }
}
