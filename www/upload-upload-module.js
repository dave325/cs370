(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["upload-upload-module"],{

/***/ "./src/app/upload/upload.module.ts":
/*!*****************************************!*\
  !*** ./src/app/upload/upload.module.ts ***!
  \*****************************************/
/*! exports provided: UploadPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadPageModule", function() { return UploadPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _upload_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./upload.page */ "./src/app/upload/upload.page.ts");







var routes = [
    {
        path: '',
        component: _upload_page__WEBPACK_IMPORTED_MODULE_6__["UploadPage"]
    }
];
var UploadPageModule = /** @class */ (function () {
    function UploadPageModule() {
    }
    UploadPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_upload_page__WEBPACK_IMPORTED_MODULE_6__["UploadPage"]]
        })
    ], UploadPageModule);
    return UploadPageModule;
}());



/***/ }),

/***/ "./src/app/upload/upload.page.html":
/*!*****************************************!*\
  !*** ./src/app/upload/upload.page.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title>\r\n      Case Upload\r\n    </ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <form #form=\"ngForm\" (ngSubmit)=\"doUpload(form)\">\r\n    <ion-grid>\r\n      <ion-row color=\"primary\" justify-content-center>\r\n        <ion-col align-self-center size-md=\"6\" size-lg=\"5\" size-xs=\"12\">\r\n          <div text-center>\r\n            <h3>Upload your case!</h3>\r\n          </div>\r\n          <div padding>\r\n            <ion-item>\r\n              <ion-label>Username:</ion-label>\r\n              <ion-input name=\"p_usr_username\" type=\"text\" placeholder=\"What is your username?\" ngModel required>\r\n              </ion-input>\r\n            </ion-item>\r\n            <ion-item>\r\n              <ion-label>Password:</ion-label>\r\n              <ion-input name=\"p_usr_password\" type=\"password\" placeholder=\"What is your password?\" ngModel required>\r\n              </ion-input>\r\n            </ion-item>\r\n\r\n\r\n            <ion-item>\r\n\r\n\r\n              <ion-label>Interest Group:</ion-label>\r\n\r\n              <ion-select name=\"p_sig\" value=\"215\" [(ngModel)]=\"p_sig\" >\r\n                <ion-select-option value=\"209\">Unified Modeling Language</ion-select-option>\r\n                <ion-select-option value=\"210\">Specification and Requirement</ion-select-option>\r\n\r\n                <ion-select-option value=\"211\">Coding</ion-select-option>\r\n                <ion-select-option value=\"212\">QA Testing</ion-select-option>\r\n\r\n                <ion-select-option value=\"213\">Verification and Validation</ion-select-option>\r\n                <ion-select-option value=\"214\">Security</ion-select-option>\r\n\r\n                <ion-select-option value=\"215\">Other Topics</ion-select-option>\r\n\r\n              </ion-select>\r\n\r\n            </ion-item>\r\n\r\n\r\n            <ion-item>\r\n              <ion-label>Subject:</ion-label>\r\n              <ion-input name=\"p_subject\" type=\"text\" placeholder=\"What is the subject of the case?\" ngModel required>\r\n              </ion-input>\r\n            </ion-item>\r\n\r\n            <ion-item>\r\n              <ion-label>Keywords:</ion-label>\r\n              <ion-input name=\"p_keyword\" type=\"text\" placeholder=\"What are the keywords of this subject?\" ngModel\r\n                required>\r\n              </ion-input>\r\n            </ion-item>\r\n\r\n            <ion-item>\r\n              <ion-label>URL:</ion-label>\r\n              <ion-input name=\"p_url\" type=\"text\" placeholder=\"Is there a relevant URL?\" ngModel>\r\n              </ion-input>\r\n            </ion-item>\r\n\r\n            <ion-item>\r\n              <ion-textarea name=\"p_text\" type=\"text\" rows=\"6\" cols=\"20\" maxlength=\"500\"\r\n                placeholder=\"What is the description of your case?\" ngModel required>\r\n              </ion-textarea>\r\n            </ion-item>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n          </div>\r\n\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </form>\r\n\r\n\r\n\r\n</ion-content>\r\n\r\n\r\n<ion-footer>\r\n  <div padding>\r\n    <ion-button (click)=\"doUpload(form)\" size=\"large\" type=\"submit\" [disabled]=\"form.invalid\" expand=\"block\">Upload\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/upload/upload.page.scss":
/*!*****************************************!*\
  !*** ./src/app/upload/upload.page.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VwbG9hZC91cGxvYWQucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/upload/upload.page.ts":
/*!***************************************!*\
  !*** ./src/app/upload/upload.page.ts ***!
  \***************************************/
/*! exports provided: UploadPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadPage", function() { return UploadPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _proxy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../proxy.service */ "./src/app/proxy.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");





var UploadPage = /** @class */ (function () {
    function UploadPage(router, proxyService, toastController) {
        this.router = router;
        this.proxyService = proxyService;
        this.toastController = toastController;
        this.p_sig = 215;
    }
    UploadPage.prototype.presentToastOnFailureToUploadCase = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Could not upload the case at this moment, please try again later!',
                            duration: 2800,
                            position: 'middle'
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    UploadPage.prototype.doUpload = function (form) {
        var _this = this;
        var formVal = form.value;
        formVal.p_sig = this.p_sig;
        this.proxyService.uploadCase(formVal).toPromise().then(function (res) {
            _this.router.navigateByUrl('upload-success');
        }, function (err) {
            _this.presentToastOnFailureToUploadCase();
        });
    };
    UploadPage.prototype.ngOnInit = function () {
    };
    UploadPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-upload',
            template: __webpack_require__(/*! ./upload.page.html */ "./src/app/upload/upload.page.html"),
            styles: [__webpack_require__(/*! ./upload.page.scss */ "./src/app/upload/upload.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _proxy_service__WEBPACK_IMPORTED_MODULE_3__["ProxyService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"]])
    ], UploadPage);
    return UploadPage;
}());



/***/ })

}]);
//# sourceMappingURL=upload-upload-module.js.map