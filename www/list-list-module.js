(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["list-list-module"],{

/***/ "./src/app/list/list.module.ts":
/*!*************************************!*\
  !*** ./src/app/list/list.module.ts ***!
  \*************************************/
/*! exports provided: ListPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListPageModule", function() { return ListPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _list_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./list.page */ "./src/app/list/list.page.ts");







var ListPageModule = /** @class */ (function () {
    function ListPageModule() {
    }
    ListPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _list_page__WEBPACK_IMPORTED_MODULE_6__["ListPage"]
                    }
                ])
            ],
            declarations: [_list_page__WEBPACK_IMPORTED_MODULE_6__["ListPage"]]
        })
    ], ListPageModule);
    return ListPageModule;
}());



/***/ }),

/***/ "./src/app/list/list.page.html":
/*!*************************************!*\
  !*** ./src/app/list/list.page.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title>\r\n      Case List\r\n    </ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n\r\n\r\n\r\n  <ion-row>\r\n\r\n    <ion-col size=\"9\">\r\n\r\n      <div *ngIf=\"choice != 'date'\">\r\n        <ion-searchbar [(ngModel)]=\"searchQuery\" name=\"searchQuery\" (keyup.enter)=\"search($event)\" #searchBar>\r\n        </ion-searchbar>\r\n\r\n      </div>\r\n      <div *ngIf=\"choice == 'date'\">\r\n        <ion-item>\r\n          <ion-label position=\"stacked\">From Date</ion-label>\r\n          <ion-searchbar [(ngModel)]=\"p_from_date\" name=\"from_data\">\r\n          </ion-searchbar>\r\n        </ion-item>\r\n        <ion-item>\r\n          <ion-label position=\"stacked\">To Date</ion-label>\r\n          <ion-searchbar [(ngModel)]=\"p_to_date\" name=\"to_date\">\r\n          </ion-searchbar>\r\n        </ion-item>\r\n        <ion-select [(ngModel)]=\"p_increment_date\" value=\"ALL_DAY\">\r\n          <ion-select-option value=\"ALL_DAY\">Get cases of every weekday\r\n          </ion-select-option>\r\n          <ion-select-option value=\"MONDAY\">Get cases of Monday only\r\n          </ion-select-option>\r\n          <ion-select-option value=\"TUESDAY\">Get cases of Tuesday only\r\n          </ion-select-option>\r\n          <ion-select-option value=\"WEDNESDAY\">Get cases of Wednesday only\r\n          </ion-select-option>\r\n          <ion-select-option value=\"THURSDAY\">Get cases of Thursday only\r\n          </ion-select-option>\r\n          <ion-select-option value=\"FRIDAY\">Get cases of Friday only\r\n          </ion-select-option>\r\n          <ion-select-option value=\"SATURDAY\">Get cases of Saturday only\r\n          </ion-select-option>\r\n          <ion-select-option value=\"SUNDAY\">Get cases of Sunday only\r\n          </ion-select-option>\r\n        </ion-select>\r\n        <ion-button size=\"small\" fill=\"outline\" color=\"primary\" (click)=\"submitDate()\">Submit</ion-button>\r\n      </div>\r\n      <h2 class=\"alert alert-danger\" *ngIf=\"error\" role=\"alert\">{{error}}</h2>\r\n      <h2 class=\"alert alert-info\" *ngIf=\"info\" role=\"alert\">{{info}}</h2>\r\n\r\n    </ion-col>\r\n\r\n\r\n\r\n\r\n    <ion-col size=\"3\">\r\n      <ion-label>Search By</ion-label>\r\n\r\n      <ion-select value=\"lastname\" okText=\"Okay\" cancelText=\"Dismiss\" #filterChoice [(ngModel)]=\"choice\">\r\n        <ion-select-option value=\"keyword\">Keyword</ion-select-option>\r\n        <ion-select-option value=\"id\">ID</ion-select-option>\r\n        <ion-select-option value=\"lastname\">Lastname</ion-select-option>\r\n        <ion-select-option value=\"date\">Date</ion-select-option>\r\n      </ion-select>\r\n    </ion-col>\r\n  </ion-row>\r\n\r\n  <div padding>\r\n  </div>\r\n  <ion-item>\r\n\r\n  </ion-item>\r\n  <ion-list>\r\n    <ion-item *ngFor=\"let item of caseList\" [routerDirection]=\"'root'\" [routerLink]=\"'/case/' + item.GetCase\">\r\n      {{item.Subject}} by {{item.Author}}<br>\r\n      <div class=\"item-note\" slot=\"end\">\r\n        {{item.GetCase}}\r\n        <br>\r\n        {{item.Date}}\r\n\r\n      </div>\r\n\r\n    </ion-item>\r\n  </ion-list>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/list/list.page.scss":
/*!*************************************!*\
  !*** ./src/app/list/list.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xpc3QvbGlzdC5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/list/list.page.ts":
/*!***********************************!*\
  !*** ./src/app/list/list.page.ts ***!
  \***********************************/
/*! exports provided: ListPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListPage", function() { return ListPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _proxy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../proxy.service */ "./src/app/proxy.service.ts");




var ListPage = /** @class */ (function () {
    function ListPage(route, proxyService) {
        this.route = route;
        this.proxyService = proxyService;
        this.choice = 'lastname';
    }
    ListPage.prototype.search = function ($event) {
        console.log("CHOICE IS " + this.choice);
        console.log("QUERY IS " + this.searchQuery);
        if (this.searchQuery == undefined) {
            this.info = null;
            this.error = "Please add something in the search query";
            return;
        }
        this.error = null;
        if (this.choice == undefined) {
            this.choice = 'lastname';
        }
        if (this.choice === 'id') {
            this.doSearch(this.proxyService.ENDPOINTS.getByID, {
                p_case_select: this.searchQuery
            });
        }
        if (this.choice === 'lastname') {
            this.doSearch(this.proxyService.ENDPOINTS.getByName, {
                p_lname: this.searchQuery,
                p_fname: ""
            });
        }
        if (this.choice === 'keyword') {
            this.doSearch(this.proxyService.ENDPOINTS.getByKeyword, {
                p_keyword: this.searchQuery,
                p_s_choice: 3
            });
        }
    };
    ListPage.prototype.doSearch = function (endpoint, info) {
        var _this = this;
        this.caseList = [];
        this.proxyService.getCaseBy(endpoint, info).then(function (res) {
            _this.caseList = [];
            var i = res.length;
            if (_this.choice === "id") {
                _this.route.navigate(['/case/' + info.p_case_select]);
            }
            while (i--) {
                var element = res[i];
                if (Object.keys(element).length > 1) {
                    if (element.Author.length > 0) {
                        _this.caseList.push(element);
                    }
                }
            }
            if (_this.caseList.length === 0) {
                _this.info = null;
                _this.error = "No Cases Found!";
            }
            else {
                _this.error = null;
                _this.caseList.reverse();
            }
        }, function (err) {
            console.log(err);
            _this.info = null;
            _this.error = "There was an error searching for cases. Please try later.";
        });
    };
    ListPage.prototype.submitDate = function () {
        var _this = this;
        var info = {
            p_from_date: this.p_from_date,
            p_to_date: this.p_to_date,
            p_increment_date: this.p_increment_date
        };
        this.proxyService.getCaseBy(this.proxyService.ENDPOINTS.getByDate, info)
            .then(function (res) {
            _this.caseList = [];
            var i = res.length;
            while (i--) {
                var element = res[i];
                console.log(element);
                if (Object.keys(element).length > 1) {
                    if (element.Author.length > 0) {
                        _this.caseList.push(element);
                    }
                }
            }
            if (_this.caseList.length === 0) {
                _this.info = null;
                _this.error = "No Cases Found!";
            }
            else {
                _this.error = null;
                _this.caseList.reverse();
            }
        }, function (err) {
            console.log(err);
            _this.info = null;
            _this.error = "There was an error searching for cases. Please try later.";
        });
    };
    ListPage.prototype.ngOnInit = function () {
    };
    ListPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-list',
            template: __webpack_require__(/*! ./list.page.html */ "./src/app/list/list.page.html"),
            styles: [__webpack_require__(/*! ./list.page.scss */ "./src/app/list/list.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _proxy_service__WEBPACK_IMPORTED_MODULE_3__["ProxyService"]])
    ], ListPage);
    return ListPage;
}());



/***/ })

}]);
//# sourceMappingURL=list-list-module.js.map