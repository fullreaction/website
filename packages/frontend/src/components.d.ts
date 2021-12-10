/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ValidationErrors } from "./utils/form";
import { RecursiveSkeleton } from "./services/file-system-services";
import { JSX } from "@stencil/core";
import { FileEntry } from "./models/upload.models";
import { FSparams } from "./components/pages/app-admin/admin-upload/admin-upload";
export namespace Components {
    interface AdminTable {
    }
    interface AdminUpload {
    }
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
        "horizontal": boolean;
    }
    interface AppReset {
    }
    interface AppResetComplete {
    }
    interface AppRoot {
    }
    interface AppSection {
        "background": boolean;
        "elevate": boolean;
        "noMargin": boolean;
    }
    interface AppSidenav {
    }
    interface AppSupport {
    }
    interface CompAlert {
    }
    interface CompSearchbar {
    }
    interface CompTree {
        "detailFactory": (child: RecursiveSkeleton) => JSX.Element;
        "tree": RecursiveSkeleton;
    }
    interface CompTreeNode {
        "detailFactory": (child: RecursiveSkeleton) => JSX.Element;
        "isOpen": boolean;
        "subTree": RecursiveSkeleton;
    }
    interface DropdownBtn {
    }
    interface DropdownShell {
    }
    interface ImageView {
        "hideArrows": boolean;
        "hideExit": boolean;
        "imageBlob": Blob;
    }
    interface ItemboxContent {
        "itemIcon": string;
        "itemName": string;
        "showDots": boolean;
    }
    interface ItemboxShell {
    }
    interface UploadContent {
        "forceRender": boolean;
    }
    interface UploadSidebar {
        "forceRender": boolean;
    }
}
declare global {
    interface HTMLAdminTableElement extends Components.AdminTable, HTMLStencilElement {
    }
    var HTMLAdminTableElement: {
        prototype: HTMLAdminTableElement;
        new (): HTMLAdminTableElement;
    };
    interface HTMLAdminUploadElement extends Components.AdminUpload, HTMLStencilElement {
    }
    var HTMLAdminUploadElement: {
        prototype: HTMLAdminUploadElement;
        new (): HTMLAdminUploadElement;
    };
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
    interface HTMLCompAlertElement extends Components.CompAlert, HTMLStencilElement {
    }
    var HTMLCompAlertElement: {
        prototype: HTMLCompAlertElement;
        new (): HTMLCompAlertElement;
    };
    interface HTMLCompSearchbarElement extends Components.CompSearchbar, HTMLStencilElement {
    }
    var HTMLCompSearchbarElement: {
        prototype: HTMLCompSearchbarElement;
        new (): HTMLCompSearchbarElement;
    };
    interface HTMLCompTreeElement extends Components.CompTree, HTMLStencilElement {
    }
    var HTMLCompTreeElement: {
        prototype: HTMLCompTreeElement;
        new (): HTMLCompTreeElement;
    };
    interface HTMLCompTreeNodeElement extends Components.CompTreeNode, HTMLStencilElement {
    }
    var HTMLCompTreeNodeElement: {
        prototype: HTMLCompTreeNodeElement;
        new (): HTMLCompTreeNodeElement;
    };
    interface HTMLDropdownBtnElement extends Components.DropdownBtn, HTMLStencilElement {
    }
    var HTMLDropdownBtnElement: {
        prototype: HTMLDropdownBtnElement;
        new (): HTMLDropdownBtnElement;
    };
    interface HTMLDropdownShellElement extends Components.DropdownShell, HTMLStencilElement {
    }
    var HTMLDropdownShellElement: {
        prototype: HTMLDropdownShellElement;
        new (): HTMLDropdownShellElement;
    };
    interface HTMLImageViewElement extends Components.ImageView, HTMLStencilElement {
    }
    var HTMLImageViewElement: {
        prototype: HTMLImageViewElement;
        new (): HTMLImageViewElement;
    };
    interface HTMLItemboxContentElement extends Components.ItemboxContent, HTMLStencilElement {
    }
    var HTMLItemboxContentElement: {
        prototype: HTMLItemboxContentElement;
        new (): HTMLItemboxContentElement;
    };
    interface HTMLItemboxShellElement extends Components.ItemboxShell, HTMLStencilElement {
    }
    var HTMLItemboxShellElement: {
        prototype: HTMLItemboxShellElement;
        new (): HTMLItemboxShellElement;
    };
    interface HTMLUploadContentElement extends Components.UploadContent, HTMLStencilElement {
    }
    var HTMLUploadContentElement: {
        prototype: HTMLUploadContentElement;
        new (): HTMLUploadContentElement;
    };
    interface HTMLUploadSidebarElement extends Components.UploadSidebar, HTMLStencilElement {
    }
    var HTMLUploadSidebarElement: {
        prototype: HTMLUploadSidebarElement;
        new (): HTMLUploadSidebarElement;
    };
    interface HTMLElementTagNameMap {
        "admin-table": HTMLAdminTableElement;
        "admin-upload": HTMLAdminUploadElement;
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
        "comp-alert": HTMLCompAlertElement;
        "comp-searchbar": HTMLCompSearchbarElement;
        "comp-tree": HTMLCompTreeElement;
        "comp-tree-node": HTMLCompTreeNodeElement;
        "dropdown-btn": HTMLDropdownBtnElement;
        "dropdown-shell": HTMLDropdownShellElement;
        "image-view": HTMLImageViewElement;
        "itembox-content": HTMLItemboxContentElement;
        "itembox-shell": HTMLItemboxShellElement;
        "upload-content": HTMLUploadContentElement;
        "upload-sidebar": HTMLUploadSidebarElement;
    }
}
declare namespace LocalJSX {
    interface AdminTable {
    }
    interface AdminUpload {
    }
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
        "horizontal"?: boolean;
        "onRegister"?: (event: CustomEvent<any>) => void;
    }
    interface AppReset {
    }
    interface AppResetComplete {
    }
    interface AppRoot {
    }
    interface AppSection {
        "background"?: boolean;
        "elevate"?: boolean;
        "noMargin"?: boolean;
    }
    interface AppSidenav {
    }
    interface AppSupport {
    }
    interface CompAlert {
        "onCancel"?: (event: CustomEvent<boolean>) => void;
        "onClose"?: (event: CustomEvent<boolean>) => void;
        "onConfirm"?: (event: CustomEvent<boolean>) => void;
    }
    interface CompSearchbar {
        "onSearch"?: (event: CustomEvent<string>) => void;
    }
    interface CompTree {
        "detailFactory"?: (child: RecursiveSkeleton) => JSX.Element;
        "tree"?: RecursiveSkeleton;
    }
    interface CompTreeNode {
        "detailFactory"?: (child: RecursiveSkeleton) => JSX.Element;
        "isOpen"?: boolean;
        "subTree"?: RecursiveSkeleton;
    }
    interface DropdownBtn {
    }
    interface DropdownShell {
    }
    interface ImageView {
        "hideArrows"?: boolean;
        "hideExit"?: boolean;
        "imageBlob"?: Blob;
        "onExitClick"?: (event: CustomEvent<any>) => void;
        "onLeftArrowClick"?: (event: CustomEvent<any>) => void;
        "onRightArrowClick"?: (event: CustomEvent<any>) => void;
    }
    interface ItemboxContent {
        "itemIcon"?: string;
        "itemName"?: string;
        "onItemClick"?: (event: CustomEvent<any>) => void;
        "showDots"?: boolean;
    }
    interface ItemboxShell {
    }
    interface UploadContent {
        "forceRender"?: boolean;
        "onCancelMedia"?: (event: CustomEvent<any>) => void;
        "onOverlayRequest"?: (event: CustomEvent<any>) => void;
        "onPreviewRequest"?: (event: CustomEvent<FileEntry>) => void;
        "onRefreshRequest"?: (event: CustomEvent<any>) => void;
        "onSelectMedia"?: (event: CustomEvent<FileEntry[]>) => void;
        "onUpdateRequest"?: (event: CustomEvent<RecursiveSkeleton | number>) => void;
    }
    interface UploadSidebar {
        "forceRender"?: boolean;
        "onOverlayRequest"?: (event: CustomEvent<FSparams>) => void;
        "onRefreshRequest"?: (event: CustomEvent<any>) => void;
        "onUpdateRequest"?: (event: CustomEvent<RecursiveSkeleton | number>) => void;
    }
    interface IntrinsicElements {
        "admin-table": AdminTable;
        "admin-upload": AdminUpload;
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
        "comp-alert": CompAlert;
        "comp-searchbar": CompSearchbar;
        "comp-tree": CompTree;
        "comp-tree-node": CompTreeNode;
        "dropdown-btn": DropdownBtn;
        "dropdown-shell": DropdownShell;
        "image-view": ImageView;
        "itembox-content": ItemboxContent;
        "itembox-shell": ItemboxShell;
        "upload-content": UploadContent;
        "upload-sidebar": UploadSidebar;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "admin-table": LocalJSX.AdminTable & JSXBase.HTMLAttributes<HTMLAdminTableElement>;
            "admin-upload": LocalJSX.AdminUpload & JSXBase.HTMLAttributes<HTMLAdminUploadElement>;
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
            "comp-alert": LocalJSX.CompAlert & JSXBase.HTMLAttributes<HTMLCompAlertElement>;
            "comp-searchbar": LocalJSX.CompSearchbar & JSXBase.HTMLAttributes<HTMLCompSearchbarElement>;
            "comp-tree": LocalJSX.CompTree & JSXBase.HTMLAttributes<HTMLCompTreeElement>;
            "comp-tree-node": LocalJSX.CompTreeNode & JSXBase.HTMLAttributes<HTMLCompTreeNodeElement>;
            "dropdown-btn": LocalJSX.DropdownBtn & JSXBase.HTMLAttributes<HTMLDropdownBtnElement>;
            "dropdown-shell": LocalJSX.DropdownShell & JSXBase.HTMLAttributes<HTMLDropdownShellElement>;
            "image-view": LocalJSX.ImageView & JSXBase.HTMLAttributes<HTMLImageViewElement>;
            "itembox-content": LocalJSX.ItemboxContent & JSXBase.HTMLAttributes<HTMLItemboxContentElement>;
            "itembox-shell": LocalJSX.ItemboxShell & JSXBase.HTMLAttributes<HTMLItemboxShellElement>;
            "upload-content": LocalJSX.UploadContent & JSXBase.HTMLAttributes<HTMLUploadContentElement>;
            "upload-sidebar": LocalJSX.UploadSidebar & JSXBase.HTMLAttributes<HTMLUploadSidebarElement>;
        }
    }
}
