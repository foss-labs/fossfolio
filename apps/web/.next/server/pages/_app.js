/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
    var exports = {};
    exports.id = 'pages/_app';
    exports.ids = ['pages/_app'];
    exports.modules = {
        /***/ './auth/index.ts':
            /*!***********************!*\
  !*** ./auth/index.ts ***!
  \***********************/
            /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
                'use strict';
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "authConfig": () => (/* binding */ authConfig)\n/* harmony export */ });\n/* harmony import */ var supertokens_auth_react_recipe_thirdparty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! supertokens-auth-react/recipe/thirdparty */ "supertokens-auth-react/recipe/thirdparty");\n/* harmony import */ var supertokens_auth_react_recipe_thirdparty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(supertokens_auth_react_recipe_thirdparty__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var supertokens_auth_react_recipe_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! supertokens-auth-react/recipe/session */ "supertokens-auth-react/recipe/session");\n/* harmony import */ var supertokens_auth_react_recipe_session__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(supertokens_auth_react_recipe_session__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _app_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/config */ "./config/index.ts");\n\n\n\nconst authConfig = ()=>({\n        appInfo: {\n            appName: _app_config__WEBPACK_IMPORTED_MODULE_2__.ENV.appName,\n            apiDomain: _app_config__WEBPACK_IMPORTED_MODULE_2__.ENV.apiDomain,\n            websiteDomain: _app_config__WEBPACK_IMPORTED_MODULE_2__.ENV.domain,\n            apiBasePath: _app_config__WEBPACK_IMPORTED_MODULE_2__.ENV.apiPath,\n            websiteBasePath: _app_config__WEBPACK_IMPORTED_MODULE_2__.ENV.webPath\n        },\n        recipeList: [\n            supertokens_auth_react_recipe_thirdparty__WEBPACK_IMPORTED_MODULE_0___default().init({\n                signInAndUpFeature: {\n                    providers: [\n                        supertokens_auth_react_recipe_thirdparty__WEBPACK_IMPORTED_MODULE_0__.Google.init()\n                    ]\n                }\n            }),\n            supertokens_auth_react_recipe_session__WEBPACK_IMPORTED_MODULE_1___default().init()\n        ]\n    });\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hdXRoL2luZGV4LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUE4RTtBQUNsQjtBQUMxQjtBQUUzQixNQUFNSSxhQUFhLElBQU87UUFDN0JDLFNBQVM7WUFDTEMsU0FBU0gsb0RBQVc7WUFDcEJJLFdBQVdKLHNEQUFhO1lBQ3hCSyxlQUFlTCxtREFBVTtZQUN6Qk8sYUFBYVAsb0RBQVc7WUFDeEJTLGlCQUFpQlQsb0RBQVc7UUFDaEM7UUFDQVcsWUFBWTtZQUNSZCxvRkFBZSxDQUFDO2dCQUNaZ0Isb0JBQW9CO29CQUNoQkMsV0FBVzt3QkFBQ2hCLGlGQUFXO3FCQUFHO2dCQUM5QjtZQUNKO1lBQ0FDLGlGQUFZO1NBQ2Y7SUFDTCxHQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViLy4vYXV0aC9pbmRleC50cz85ZGNmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUaGlyZFBhcnR5LCB7IEdvb2dsZSB9IGZyb20gJ3N1cGVydG9rZW5zLWF1dGgtcmVhY3QvcmVjaXBlL3RoaXJkcGFydHknO1xuaW1wb3J0IFNlc3Npb24gZnJvbSAnc3VwZXJ0b2tlbnMtYXV0aC1yZWFjdC9yZWNpcGUvc2Vzc2lvbic7XG5pbXBvcnQgeyBFTlYgfSBmcm9tICdAYXBwL2NvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBhdXRoQ29uZmlnID0gKCkgPT4gKHtcbiAgICBhcHBJbmZvOiB7XG4gICAgICAgIGFwcE5hbWU6IEVOVi5hcHBOYW1lLFxuICAgICAgICBhcGlEb21haW46IEVOVi5hcGlEb21haW4sXG4gICAgICAgIHdlYnNpdGVEb21haW46IEVOVi5kb21haW4sXG4gICAgICAgIGFwaUJhc2VQYXRoOiBFTlYuYXBpUGF0aCxcbiAgICAgICAgd2Vic2l0ZUJhc2VQYXRoOiBFTlYud2ViUGF0aCxcbiAgICB9LFxuICAgIHJlY2lwZUxpc3Q6IFtcbiAgICAgICAgVGhpcmRQYXJ0eS5pbml0KHtcbiAgICAgICAgICAgIHNpZ25JbkFuZFVwRmVhdHVyZToge1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyczogW0dvb2dsZS5pbml0KCldLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICAgIFNlc3Npb24uaW5pdCgpLFxuICAgIF0sXG59KTtcbiJdLCJuYW1lcyI6WyJUaGlyZFBhcnR5IiwiR29vZ2xlIiwiU2Vzc2lvbiIsIkVOViIsImF1dGhDb25maWciLCJhcHBJbmZvIiwiYXBwTmFtZSIsImFwaURvbWFpbiIsIndlYnNpdGVEb21haW4iLCJkb21haW4iLCJhcGlCYXNlUGF0aCIsImFwaVBhdGgiLCJ3ZWJzaXRlQmFzZVBhdGgiLCJ3ZWJQYXRoIiwicmVjaXBlTGlzdCIsImluaXQiLCJzaWduSW5BbmRVcEZlYXR1cmUiLCJwcm92aWRlcnMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./auth/index.ts\n',
                );

                /***/
            },

        /***/ './config/env.ts':
            /*!***********************!*\
  !*** ./config/env.ts ***!
  \***********************/
            /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
                'use strict';
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "ENV": () => (/* binding */ ENV)\n/* harmony export */ });\nconst ENV = {\n    appName: "fossfolio",\n    apiDomain: "http://localhost:3001",\n    domain: "http://localhost:3000",\n    apiPath: process.env.NEXT_PUBLIC_SUPERTOKEN_API_BASEPATH,\n    webPath: process.env.NEXT_PUBLIC_SUPERTOKEN_WEBSITE_BASEPATH\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb25maWcvZW52LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTyxNQUFNQSxNQUFNO0lBQ2ZDLFNBQVNDLFdBQTJDO0lBQ3BERyxXQUFXSCx1QkFBa0M7SUFDN0NLLFFBQVFMLHVCQUFzQztJQUM5Q08sU0FBU1AsUUFBUUMsR0FBRyxDQUFDTyxtQ0FBbUM7SUFDeERDLFNBQVNULFFBQVFDLEdBQUcsQ0FBQ1MsdUNBQXVDO0FBQ2hFLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWIvLi9jb25maWcvZW52LnRzP2VhM2QiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IEVOViA9IHtcclxuICAgIGFwcE5hbWU6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEVSVE9LRU5fQVBQX05BTUUsXHJcbiAgICBhcGlEb21haW46IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FQSV9ET01BSU4sXHJcbiAgICBkb21haW46IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1dFQlNJVEVfRE9NQUlOLFxyXG4gICAgYXBpUGF0aDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQRVJUT0tFTl9BUElfQkFTRVBBVEgsXHJcbiAgICB3ZWJQYXRoOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBFUlRPS0VOX1dFQlNJVEVfQkFTRVBBVEgsXHJcbn07XHJcbiJdLCJuYW1lcyI6WyJFTlYiLCJhcHBOYW1lIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NVUEVSVE9LRU5fQVBQX05BTUUiLCJhcGlEb21haW4iLCJORVhUX1BVQkxJQ19BUElfRE9NQUlOIiwiZG9tYWluIiwiTkVYVF9QVUJMSUNfV0VCU0lURV9ET01BSU4iLCJhcGlQYXRoIiwiTkVYVF9QVUJMSUNfU1VQRVJUT0tFTl9BUElfQkFTRVBBVEgiLCJ3ZWJQYXRoIiwiTkVYVF9QVUJMSUNfU1VQRVJUT0tFTl9XRUJTSVRFX0JBU0VQQVRIIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./config/env.ts\n',
                );

                /***/
            },

        /***/ './config/index.ts':
            /*!*************************!*\
  !*** ./config/index.ts ***!
  \*************************/
            /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
                'use strict';
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "ENV": () => (/* reexport safe */ _env__WEBPACK_IMPORTED_MODULE_0__.ENV)\n/* harmony export */ });\n/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env */ "./config/env.ts");\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb25maWcvaW5kZXgudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBNEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWIvLi9jb25maWcvaW5kZXgudHM/NmQxYiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgeyBFTlYgfSBmcm9tICcuL2Vudic7XHJcbiJdLCJuYW1lcyI6WyJFTlYiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./config/index.ts\n',
                );

                /***/
            },

        /***/ './pages/_app.tsx':
            /*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
            /***/ (module, __webpack_exports__, __webpack_require__) => {
                'use strict';
                eval(
                    '__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/react */ "@chakra-ui/react");\n/* harmony import */ var supertokens_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! supertokens-auth-react */ "supertokens-auth-react");\n/* harmony import */ var supertokens_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(supertokens_auth_react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _app_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/auth */ "./auth/index.ts");\n/* harmony import */ var _app_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/theme */ "./theme/index.ts");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__, _app_theme__WEBPACK_IMPORTED_MODULE_4__]);\n([_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__, _app_theme__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n/* eslint-disable react/jsx-props-no-spreading */ \n\n\n\n\nif (false) {}\nconst MyApp = ({ Component , pageProps  })=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(supertokens_auth_react__WEBPACK_IMPORTED_MODULE_2__.SuperTokensWrapper, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.ChakraProvider, {\n            theme: _app_theme__WEBPACK_IMPORTED_MODULE_4__.theme,\n            children: Component.Layout ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component.Layout, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: "F:\\\\fossfolio\\\\apps\\\\web\\\\pages\\\\_app.tsx",\n                    lineNumber: 25,\n                    columnNumber: 21\n                }, undefined)\n            }, void 0, false, {\n                fileName: "F:\\\\fossfolio\\\\apps\\\\web\\\\pages\\\\_app.tsx",\n                lineNumber: 24,\n                columnNumber: 17\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: "F:\\\\fossfolio\\\\apps\\\\web\\\\pages\\\\_app.tsx",\n                lineNumber: 28,\n                columnNumber: 17\n            }, undefined)\n        }, void 0, false, {\n            fileName: "F:\\\\fossfolio\\\\apps\\\\web\\\\pages\\\\_app.tsx",\n            lineNumber: 22,\n            columnNumber: 9\n        }, undefined)\n    }, void 0, false, {\n        fileName: "F:\\\\fossfolio\\\\apps\\\\web\\\\pages\\\\_app.tsx",\n        lineNumber: 20,\n        columnNumber: 5\n    }, undefined);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUErQztBQUNHO0FBRXVCO0FBQ2xDO0FBQ0o7QUFTbkMsSUFBSSxLQUFrQixFQUFhLEVBRWxDO0FBRUQsTUFBTU0sUUFBUSxDQUFDLEVBQUVDLFVBQVMsRUFBRUMsVUFBUyxFQUEyQixpQkFDNUQsOERBQUNOLHNFQUFrQkE7a0JBRWYsNEVBQUNGLDREQUFjQTtZQUFDSSxPQUFPQSw2Q0FBS0E7c0JBQ3ZCRyxVQUFVRSxNQUFNLGlCQUNiLDhEQUFDRixVQUFVRSxNQUFNOzBCQUNiLDRFQUFDRjtvQkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7OzBDQUc1Qiw4REFBQ0Q7Z0JBQVcsR0FBR0MsU0FBUzs7Ozs7eUJBQzNCOzs7Ozs7Ozs7OztBQU1iLGlFQUFlRixLQUFLQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9qc3gtcHJvcHMtbm8tc3ByZWFkaW5nICovXG5pbXBvcnQgeyBDaGFrcmFQcm92aWRlciB9IGZyb20gJ0BjaGFrcmEtdWkvcmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcbmltcG9ydCBTdXBlclRva2VucywgeyBTdXBlclRva2Vuc1dyYXBwZXIgfSBmcm9tICdzdXBlcnRva2Vucy1hdXRoLXJlYWN0JztcbmltcG9ydCB7IGF1dGhDb25maWcgfSBmcm9tICdAYXBwL2F1dGgnO1xuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICdAYXBwL3RoZW1lJztcbmltcG9ydCB7IENoaWxkIH0gZnJvbSAnQGFwcC90eXBlcyc7XG5cbnR5cGUgQ29tcG9uZW50V2l0aFBhZ2VMYXlvdXQgPSBBcHBQcm9wcyAmIHtcbiAgICBDb21wb25lbnQ6IEFwcFByb3BzWydDb21wb25lbnQnXSAmIHtcbiAgICAgICAgTGF5b3V0PzogKGFyZzogQ2hpbGQpID0+IEpTWC5FbGVtZW50O1xuICAgIH07XG59O1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBTdXBlclRva2Vucy5pbml0KGF1dGhDb25maWcoKSk7XG59XG5cbmNvbnN0IE15QXBwID0gKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQ29tcG9uZW50V2l0aFBhZ2VMYXlvdXQpID0+IChcbiAgICA8U3VwZXJUb2tlbnNXcmFwcGVyPlxuICAgICAgICB7LyogPEF1dGhDb250ZXh0PiAqL31cbiAgICAgICAgPENoYWtyYVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XG4gICAgICAgICAgICB7Q29tcG9uZW50LkxheW91dCA/IChcbiAgICAgICAgICAgICAgICA8Q29tcG9uZW50LkxheW91dD5cbiAgICAgICAgICAgICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgICAgICAgICAgIDwvQ29tcG9uZW50LkxheW91dD5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9DaGFrcmFQcm92aWRlcj5cbiAgICAgICAgey8qIDwvQXV0aENvbnRleHQ+ICovfVxuICAgIDwvU3VwZXJUb2tlbnNXcmFwcGVyPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XG4iXSwibmFtZXMiOlsiQ2hha3JhUHJvdmlkZXIiLCJTdXBlclRva2VucyIsIlN1cGVyVG9rZW5zV3JhcHBlciIsImF1dGhDb25maWciLCJ0aGVtZSIsImluaXQiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsIkxheW91dCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n',
                );

                /***/
            },

        /***/ './theme/index.ts':
            /*!************************!*\
  !*** ./theme/index.ts ***!
  \************************/
            /***/ (module, __webpack_exports__, __webpack_require__) => {
                'use strict';
                eval(
                    '__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "theme": () => (/* binding */ theme)\n/* harmony export */ });\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @chakra-ui/react */ "@chakra-ui/react");\n/* harmony import */ var _fontsource_inter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fontsource/inter */ "../../node_modules/.pnpm/@fontsource+inter@4.5.15/node_modules/@fontsource/inter/index.css");\n/* harmony import */ var _fontsource_inter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fontsource_inter__WEBPACK_IMPORTED_MODULE_1__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__]);\n_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nconst config = {\n    initialColorMode: "light",\n    useSystemColorMode: false\n};\nconst theme = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.extendTheme)({\n    config,\n    fonts: {\n        heading: `\'inter\', sans-serif`\n    }\n});\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi90aGVtZS9pbmRleC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWlFO0FBQ3ZDO0FBRzFCLE1BQU1DLFNBQXNCO0lBQzFCQyxrQkFBa0I7SUFDbEJDLG9CQUFvQixLQUFLO0FBQzNCO0FBRU8sTUFBTUMsUUFBUUosNkRBQVdBLENBQUM7SUFDL0JDO0lBQ0FJLE9BQU87UUFDTEMsU0FBUyxDQUFDLG1CQUFtQixDQUFDO0lBQ2hDO0FBQ0YsR0FBRyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYi8uL3RoZW1lL2luZGV4LnRzP2M4MDkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXh0ZW5kVGhlbWUsIHR5cGUgVGhlbWVDb25maWcgfSBmcm9tICdAY2hha3JhLXVpL3JlYWN0JztcclxuaW1wb3J0IFwiQGZvbnRzb3VyY2UvaW50ZXJcIlxyXG5cclxuXHJcbmNvbnN0IGNvbmZpZzogVGhlbWVDb25maWcgPSB7XHJcbiAgaW5pdGlhbENvbG9yTW9kZTogJ2xpZ2h0JyxcclxuICB1c2VTeXN0ZW1Db2xvck1vZGU6IGZhbHNlLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHRoZW1lID0gZXh0ZW5kVGhlbWUoe1xyXG4gIGNvbmZpZyxcclxuICBmb250czoge1xyXG4gICAgaGVhZGluZzogYCdpbnRlcicsIHNhbnMtc2VyaWZgLFxyXG4gIH0sXHJcbn0pOyJdLCJuYW1lcyI6WyJleHRlbmRUaGVtZSIsImNvbmZpZyIsImluaXRpYWxDb2xvck1vZGUiLCJ1c2VTeXN0ZW1Db2xvck1vZGUiLCJ0aGVtZSIsImZvbnRzIiwiaGVhZGluZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./theme/index.ts\n',
                );

                /***/
            },

        /***/ '../../node_modules/.pnpm/@fontsource+inter@4.5.15/node_modules/@fontsource/inter/index.css':
            /*!**************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@fontsource+inter@4.5.15/node_modules/@fontsource/inter/index.css ***!
  \**************************************************************************************************/
            /***/ () => {
                /***/
            },

        /***/ 'react/jsx-dev-runtime':
            /*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
            /***/ (module) => {
                'use strict';
                module.exports = require('react/jsx-dev-runtime');

                /***/
            },

        /***/ 'supertokens-auth-react':
            /*!*****************************************!*\
  !*** external "supertokens-auth-react" ***!
  \*****************************************/
            /***/ (module) => {
                'use strict';
                module.exports = require('supertokens-auth-react');

                /***/
            },

        /***/ 'supertokens-auth-react/recipe/session':
            /*!********************************************************!*\
  !*** external "supertokens-auth-react/recipe/session" ***!
  \********************************************************/
            /***/ (module) => {
                'use strict';
                module.exports = require('supertokens-auth-react/recipe/session');

                /***/
            },

        /***/ 'supertokens-auth-react/recipe/thirdparty':
            /*!***********************************************************!*\
  !*** external "supertokens-auth-react/recipe/thirdparty" ***!
  \***********************************************************/
            /***/ (module) => {
                'use strict';
                module.exports = require('supertokens-auth-react/recipe/thirdparty');

                /***/
            },

        /***/ '@chakra-ui/react':
            /*!***********************************!*\
  !*** external "@chakra-ui/react" ***!
  \***********************************/
            /***/ (module) => {
                'use strict';
                module.exports = import('@chakra-ui/react');

                /***/
            },
    };
    // load runtime
    var __webpack_require__ = require('../webpack-runtime.js');
    __webpack_require__.C(exports);
    var __webpack_exec__ = (moduleId) => __webpack_require__((__webpack_require__.s = moduleId));
    var __webpack_exports__ = __webpack_exec__('./pages/_app.tsx');
    module.exports = __webpack_exports__;
})();
