/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ValidationErrors } from "./utils/form";
export namespace Components {
    interface AppAuth {
    }
    interface AppDocs {
    }
    interface AppErrors {
        "errors": ValidationErrors | null;
        "templates": { [key: string]: string };
    }
    interface AppFeatures {
    }
    interface AppFooter {
    }
    interface AppForm {
    }
    interface AppHeader {
    }
    interface AppHero {
    }
    interface AppHighlight {
        "code": string;
        "language": 'javascript' | 'css' | 'html';
    }
    interface AppHome {
    }
    interface AppIntegration {
    }
    interface AppLogin {
    }
    interface AppRegister {
    }
    interface AppReset {
    }
    interface AppResetComplete {
    }
    interface AppRoot {
    }
    interface AppSection {
        "background": boolean;
        "noMargin": boolean;
    }
    interface AppSidenav {
    }
    interface AppSupport {
    }
}
declare global {
    interface HTMLAppAuthElement extends Components.AppAuth, HTMLStencilElement {
    }
    var HTMLAppAuthElement: {
        prototype: HTMLAppAuthElement;
        new (): HTMLAppAuthElement;
    };
    interface HTMLAppDocsElement extends Components.AppDocs, HTMLStencilElement {
    }
    var HTMLAppDocsElement: {
        prototype: HTMLAppDocsElement;
        new (): HTMLAppDocsElement;
    };
    interface HTMLAppErrorsElement extends Components.AppErrors, HTMLStencilElement {
    }
    var HTMLAppErrorsElement: {
        prototype: HTMLAppErrorsElement;
        new (): HTMLAppErrorsElement;
    };
    interface HTMLAppFeaturesElement extends Components.AppFeatures, HTMLStencilElement {
    }
    var HTMLAppFeaturesElement: {
        prototype: HTMLAppFeaturesElement;
        new (): HTMLAppFeaturesElement;
    };
    interface HTMLAppFooterElement extends Components.AppFooter, HTMLStencilElement {
    }
    var HTMLAppFooterElement: {
        prototype: HTMLAppFooterElement;
        new (): HTMLAppFooterElement;
    };
    interface HTMLAppFormElement extends Components.AppForm, HTMLStencilElement {
    }
    var HTMLAppFormElement: {
        prototype: HTMLAppFormElement;
        new (): HTMLAppFormElement;
    };
    interface HTMLAppHeaderElement extends Components.AppHeader, HTMLStencilElement {
    }
    var HTMLAppHeaderElement: {
        prototype: HTMLAppHeaderElement;
        new (): HTMLAppHeaderElement;
    };
    interface HTMLAppHeroElement extends Components.AppHero, HTMLStencilElement {
    }
    var HTMLAppHeroElement: {
        prototype: HTMLAppHeroElement;
        new (): HTMLAppHeroElement;
    };
    interface HTMLAppHighlightElement extends Components.AppHighlight, HTMLStencilElement {
    }
    var HTMLAppHighlightElement: {
        prototype: HTMLAppHighlightElement;
        new (): HTMLAppHighlightElement;
    };
    interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {
    }
    var HTMLAppHomeElement: {
        prototype: HTMLAppHomeElement;
        new (): HTMLAppHomeElement;
    };
    interface HTMLAppIntegrationElement extends Components.AppIntegration, HTMLStencilElement {
    }
    var HTMLAppIntegrationElement: {
        prototype: HTMLAppIntegrationElement;
        new (): HTMLAppIntegrationElement;
    };
    interface HTMLAppLoginElement extends Components.AppLogin, HTMLStencilElement {
    }
    var HTMLAppLoginElement: {
        prototype: HTMLAppLoginElement;
        new (): HTMLAppLoginElement;
    };
    interface HTMLAppRegisterElement extends Components.AppRegister, HTMLStencilElement {
    }
    var HTMLAppRegisterElement: {
        prototype: HTMLAppRegisterElement;
        new (): HTMLAppRegisterElement;
    };
    interface HTMLAppResetElement extends Components.AppReset, HTMLStencilElement {
    }
    var HTMLAppResetElement: {
        prototype: HTMLAppResetElement;
        new (): HTMLAppResetElement;
    };
    interface HTMLAppResetCompleteElement extends Components.AppResetComplete, HTMLStencilElement {
    }
    var HTMLAppResetCompleteElement: {
        prototype: HTMLAppResetCompleteElement;
        new (): HTMLAppResetCompleteElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLAppSectionElement extends Components.AppSection, HTMLStencilElement {
    }
    var HTMLAppSectionElement: {
        prototype: HTMLAppSectionElement;
        new (): HTMLAppSectionElement;
    };
    interface HTMLAppSidenavElement extends Components.AppSidenav, HTMLStencilElement {
    }
    var HTMLAppSidenavElement: {
        prototype: HTMLAppSidenavElement;
        new (): HTMLAppSidenavElement;
    };
    interface HTMLAppSupportElement extends Components.AppSupport, HTMLStencilElement {
    }
    var HTMLAppSupportElement: {
        prototype: HTMLAppSupportElement;
        new (): HTMLAppSupportElement;
    };
    interface HTMLElementTagNameMap {
        "app-auth": HTMLAppAuthElement;
        "app-docs": HTMLAppDocsElement;
        "app-errors": HTMLAppErrorsElement;
        "app-features": HTMLAppFeaturesElement;
        "app-footer": HTMLAppFooterElement;
        "app-form": HTMLAppFormElement;
        "app-header": HTMLAppHeaderElement;
        "app-hero": HTMLAppHeroElement;
        "app-highlight": HTMLAppHighlightElement;
        "app-home": HTMLAppHomeElement;
        "app-integration": HTMLAppIntegrationElement;
        "app-login": HTMLAppLoginElement;
        "app-register": HTMLAppRegisterElement;
        "app-reset": HTMLAppResetElement;
        "app-reset-complete": HTMLAppResetCompleteElement;
        "app-root": HTMLAppRootElement;
        "app-section": HTMLAppSectionElement;
        "app-sidenav": HTMLAppSidenavElement;
        "app-support": HTMLAppSupportElement;
    }
}
declare namespace LocalJSX {
    interface AppAuth {
    }
    interface AppDocs {
    }
    interface AppErrors {
        "errors"?: ValidationErrors | null;
        "templates"?: { [key: string]: string };
    }
    interface AppFeatures {
    }
    interface AppFooter {
    }
    interface AppForm {
    }
    interface AppHeader {
    }
    interface AppHero {
    }
    interface AppHighlight {
        "code"?: string;
        "language"?: 'javascript' | 'css' | 'html';
    }
    interface AppHome {
    }
    interface AppIntegration {
    }
    interface AppLogin {
    }
    interface AppRegister {
    }
    interface AppReset {
    }
    interface AppResetComplete {
    }
    interface AppRoot {
    }
    interface AppSection {
        "background"?: boolean;
        "noMargin"?: boolean;
    }
    interface AppSidenav {
    }
    interface AppSupport {
    }
    interface IntrinsicElements {
        "app-auth": AppAuth;
        "app-docs": AppDocs;
        "app-errors": AppErrors;
        "app-features": AppFeatures;
        "app-footer": AppFooter;
        "app-form": AppForm;
        "app-header": AppHeader;
        "app-hero": AppHero;
        "app-highlight": AppHighlight;
        "app-home": AppHome;
        "app-integration": AppIntegration;
        "app-login": AppLogin;
        "app-register": AppRegister;
        "app-reset": AppReset;
        "app-reset-complete": AppResetComplete;
        "app-root": AppRoot;
        "app-section": AppSection;
        "app-sidenav": AppSidenav;
        "app-support": AppSupport;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-auth": LocalJSX.AppAuth & JSXBase.HTMLAttributes<HTMLAppAuthElement>;
            "app-docs": LocalJSX.AppDocs & JSXBase.HTMLAttributes<HTMLAppDocsElement>;
            "app-errors": LocalJSX.AppErrors & JSXBase.HTMLAttributes<HTMLAppErrorsElement>;
            "app-features": LocalJSX.AppFeatures & JSXBase.HTMLAttributes<HTMLAppFeaturesElement>;
            "app-footer": LocalJSX.AppFooter & JSXBase.HTMLAttributes<HTMLAppFooterElement>;
            "app-form": LocalJSX.AppForm & JSXBase.HTMLAttributes<HTMLAppFormElement>;
            "app-header": LocalJSX.AppHeader & JSXBase.HTMLAttributes<HTMLAppHeaderElement>;
            "app-hero": LocalJSX.AppHero & JSXBase.HTMLAttributes<HTMLAppHeroElement>;
            "app-highlight": LocalJSX.AppHighlight & JSXBase.HTMLAttributes<HTMLAppHighlightElement>;
            "app-home": LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            "app-integration": LocalJSX.AppIntegration & JSXBase.HTMLAttributes<HTMLAppIntegrationElement>;
            "app-login": LocalJSX.AppLogin & JSXBase.HTMLAttributes<HTMLAppLoginElement>;
            "app-register": LocalJSX.AppRegister & JSXBase.HTMLAttributes<HTMLAppRegisterElement>;
            "app-reset": LocalJSX.AppReset & JSXBase.HTMLAttributes<HTMLAppResetElement>;
            "app-reset-complete": LocalJSX.AppResetComplete & JSXBase.HTMLAttributes<HTMLAppResetCompleteElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "app-section": LocalJSX.AppSection & JSXBase.HTMLAttributes<HTMLAppSectionElement>;
            "app-sidenav": LocalJSX.AppSidenav & JSXBase.HTMLAttributes<HTMLAppSidenavElement>;
            "app-support": LocalJSX.AppSupport & JSXBase.HTMLAttributes<HTMLAppSupportElement>;
        }
    }
}
