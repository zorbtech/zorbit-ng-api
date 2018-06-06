import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';

import { WalletCreation, WalletFileModel, WalletRecovery,
         WalletLoad, WalletInfo,
         FeeEstimation, TransactionBuilding, TransactionSending,
         WalletBalanceModel, WalletHistory,
         WalletBuildTransactionModel, 
         WalletSendTransactionModel} from './dtos';

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) {};

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private pollingInterval = 3000;
    private apiUrl = 'http://localhost:37220/api';

    public getWalletFiles(): Observable<WalletFileModel> {
      return this.http
        .get<WalletFileModel>(this.apiUrl + '/wallet/files');
     }

     public getNewMnemonic(): Observable<string> {
      let params: HttpParams = new HttpParams();
      params = params.append('language', 'English');
      params = params.append('wordCount', '24');

      return this.http
        .get<string>(this.apiUrl + '/wallet/mnemonic', {headers: this.headers, params:params});
    }

    public createWallet(data: WalletCreation): Observable<string> {
      return this.http
        .post<string>(this.apiUrl + '/wallet/create/', JSON.stringify(data), {headers: this.headers});
    }

    public recoverWallet(data: WalletRecovery): Observable<any> {
      return this.http
        .post(this.apiUrl + '/wallet/recover/', JSON.stringify(data), {headers: this.headers});
    }

    public loadWallet(data: WalletLoad): Observable<any> {
      return this.http
        .post(this.apiUrl + '/wallet/load/', JSON.stringify(data), {headers: this.headers});
    }

    public getWalletStatus(): Observable<any> {
      return this.http
        .get(this.apiUrl + '/wallet/status');
    }

    public getGeneralInfoOnce(data: WalletInfo): Observable<any> {
      let params: HttpParams = new HttpParams();
      params.set('Name', data.walletName);

      return this.http
        .get(this.apiUrl + '/wallet/general-info', {headers: this.headers, params: params});
    }

    public getGeneralInfo(data: WalletInfo): Observable<any> {

      let params: HttpParams = new HttpParams();
      params.set('Name', data.walletName);

      return interval(this.pollingInterval)
        .pipe(startWith(0))
        .pipe(switchMap(() => this.http.get(this.apiUrl + '/wallet/general-info', {headers: this.headers, params: params})));
    }

    public getWalletBalance(data: WalletInfo): Observable<WalletBalanceModel> {

      const params = new HttpParams().set('walletName', data.walletName);

      return interval(this.pollingInterval)
        .pipe(startWith(0))
        .pipe(switchMap(() => this.http.get<WalletBalanceModel>(this.apiUrl + '/wallet/balance', {headers: this.headers, params: params})));
    }

    public getMaximumBalance(data): Observable<any> {

      let params: HttpParams = new HttpParams();
      params.set('walletName', data.walletName);
      params.set('accountName', "account 0");
      params.set('feeType', data.feeType);
      params.set('allowUnconfirmed', "true");

      return this.http
        .get(this.apiUrl + '/wallet/maxbalance', {headers: this.headers, params: params});
    }

    public getWalletHistory(data: WalletInfo): Observable<WalletHistory> {

      const params = new HttpParams().set('walletName', data.walletName);

      return interval(this.pollingInterval)
        .pipe(startWith(0))
        .pipe(switchMap(() => this.http.get<WalletHistory>(this.apiUrl + '/wallet/history', {headers: this.headers, params: params})));
    }

    public getUnusedReceiveAddress(data: WalletInfo): Observable<any> {

      let params: HttpParams = new HttpParams();
      params = params.append('walletName', data.walletName);
      params = params.append('accountName', "account 0"); //temporary
      console.log(params);
      return this.http
        .get(this.apiUrl + '/wallet/unusedaddress', {headers: this.headers, params: params});
    }

    public getUnusedReceiveAddresses(data: WalletInfo, count: string): Observable<any> {

      let params: HttpParams = new HttpParams();
      params = params.append('walletName', data.walletName);
      params = params.append('accountName', "account 0"); //temporary
      params = params.append('count', count);
      return this.http
        .get(this.apiUrl + '/wallet/unusedaddresses', {headers: this.headers, params: params});
    }

    public getAllReceiveAddresses(data: WalletInfo): Observable<any> {

      let params: HttpParams = new HttpParams();
      params.set('walletName', data.walletName);
      params.set('accountName', "account 0"); //temporary
      return this.http
        .get(this.apiUrl + '/wallet/addresses', {headers: this.headers, params: params});
    }

    public estimateFee(data: FeeEstimation): Observable<any> {

      let params: HttpParams = new HttpParams();
      params.set('walletName', data.walletName);
      params.set('accountName', data.accountName);
      params.set('destinationAddress', data.destinationAddress);
      params.set('amount', data.amount);
      params.set('feeType', data.feeType);
      params.set('allowUnconfirmed', "true");

      return this.http
        .get(this.apiUrl + '/wallet/estimate-txfee', {headers: this.headers, params: params});
    }

    public buildTransaction(data: TransactionBuilding): Observable<WalletBuildTransactionModel> {

      return this.http
        .post<WalletBuildTransactionModel>(this.apiUrl + '/wallet/build-transaction', JSON.stringify(data), {headers: this.headers});
    }

    public sendTransaction(data: TransactionSending): Observable<WalletSendTransactionModel> {

      return this.http
        .post<WalletSendTransactionModel>(this.apiUrl + '/wallet/send-transaction', JSON.stringify(data), {headers: this.headers});
    }

    public shutdownNode(): Observable<any> {

      return this.http
        .post(this.apiUrl + '/node/shutdown', '');
    }
}
