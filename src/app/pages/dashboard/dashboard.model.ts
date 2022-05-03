export interface ChartType {
    series?: any;
    plotOptions?: any;
    stroke?: any;
    dataLabels?: any;
    chart?: any;
    legend?: any;
    colors?: any;
    labels?: any;
}

export interface Stat {
    title: string;
    icon: string;
    value: string;
}

export interface Transaction {
    orderid: string;
    date: string;
    billingname: string;
    total: string;
    paymentstatus: string;
}
