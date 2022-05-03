import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { latLng, tileLayer } from 'leaflet';

import { ChartType, Stat, Transaction } from './dashboard.model';

import {  revenueChart, salesAnalytics, sparklineEarning, sparklineMonthly, transactions } from './data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

/**
 * Dashboard Component
 */
export class DashboardComponent implements OnInit {
  title="Dashboard"
  term: any;
  transactions: Transaction[];
  statData: Stat[];

  constructor(public formBuilder: FormBuilder) {
  }

  // bread crumb items
  breadCrumbItems: Array<{}>;

  revenueChart: ChartType;
  salesAnalytics: ChartType;
  sparklineEarning: ChartType;
  sparklineMonthly: ChartType;

  // Form submit
  chatSubmit: boolean;

  formData: FormGroup;


  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 6,
    center: latLng(46.879966, -121.726909)
  };

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Shinify' }, { label: 'Dashboard', active: true }];

    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
    this._fetchData();
  }

  private _fetchData() {
    this.revenueChart = revenueChart;
    this.salesAnalytics = salesAnalytics;
    this.sparklineEarning = sparklineEarning;
    this.sparklineMonthly = sparklineMonthly;
    this.transactions = transactions;
  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

}
