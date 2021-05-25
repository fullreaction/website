/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppDocs {
    }
    interface AppFooter {
    }
    interface AppHeader {
    }
    interface AppHero {
    }
    interface AppHome {
    }
    interface AppIntegration {
    }
    interface AppRoot {
    }
}
declare global {
    interface HTMLAppDocsElement extends Components.AppDocs, HTMLStencilElement {
    }
    var HTMLAppDocsElement: {
        prototype: HTMLAppDocsElement;
        new (): HTMLAppDocsElement;
    };
    interface HTMLAppFooterElement extends Components.AppFooter, HTMLStencilElement {
    }
    var HTMLAppFooterElement: {
        prototype: HTMLAppFooterElement;
        new (): HTMLAppFooterElement;
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
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLElementTagNameMap {
        "app-docs": HTMLAppDocsElement;
        "app-footer": HTMLAppFooterElement;
        "app-header": HTMLAppHeaderElement;
        "app-hero": HTMLAppHeroElement;
        "app-home": HTMLAppHomeElement;
        "app-integration": HTMLAppIntegrationElement;
        "app-root": HTMLAppRootElement;
    }
}
declare namespace LocalJSX {
    interface AppDocs {
    }
    interface AppFooter {
    }
    interface AppHeader {
    }
    interface AppHero {
    }
    interface AppHome {
    }
    interface AppIntegration {
    }
    interface AppRoot {
    }
    interface IntrinsicElements {
        "app-docs": AppDocs;
        "app-footer": AppFooter;
        "app-header": AppHeader;
        "app-hero": AppHero;
        "app-home": AppHome;
        "app-integration": AppIntegration;
        "app-root": AppRoot;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-docs": LocalJSX.AppDocs & JSXBase.HTMLAttributes<HTMLAppDocsElement>;
            "app-footer": LocalJSX.AppFooter & JSXBase.HTMLAttributes<HTMLAppFooterElement>;
            "app-header": LocalJSX.AppHeader & JSXBase.HTMLAttributes<HTMLAppHeaderElement>;
            "app-hero": LocalJSX.AppHero & JSXBase.HTMLAttributes<HTMLAppHeroElement>;
            "app-home": LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            "app-integration": LocalJSX.AppIntegration & JSXBase.HTMLAttributes<HTMLAppIntegrationElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
        }
    }
}
