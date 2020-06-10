# Edit Post

Edit Post Module for WordPress.

> This package is meant to be used only with WordPress core. Feel free to use it in your own project but please keep in mind that it might never get fully documented.

## Installation

Install the module

```bash
npm install @wordpress/edit-post
```

_This package assumes that your code will run in an **ES2015+** environment. If you're using an environment that has limited or no support for ES2015+ such as lower versions of IE then using [core-js](https://github.com/zloirock/core-js) or [@babel/polyfill](https://babeljs.io/docs/en/next/babel-polyfill) will add support for these methods. Learn more about it in [Babel docs](https://babeljs.io/docs/en/next/caveats)._

## Extending the post editor UI

Extending the editor UI can be accomplished with the `registerPlugin` API, allowing you to define all your plugin's UI elements in one place.

Refer to [the plugins module documentation](/packages/plugins/README.md) for more information.

The components exported through the API can be used with the `registerPlugin` ([see documentation](/packages/plugins/README.md)) API.
They can be found in the global variable `wp.editPost` when defining `wp-edit-post` as a script dependency.

## API

<!-- START TOKEN(Autogenerated API docs) -->

<a name="initializeEditor" href="#initializeEditor">#</a> **initializeEditor**

Initializes and returns an instance of Editor.

The return value of this function is not necessary if we change where we
call initializeEditor(). This is due to metaBox timing.

_Parameters_

-   _id_ `string`: Unique identifier for editor instance.
-   _postType_ `Object`: Post type of the post to edit.
-   _postId_ `Object`: ID of the post to edit.
-   _settings_ `?Object`: Editor settings object.
-   _initialEdits_ `Object`: Programmatic edits to apply initially, to be considered as non-user-initiated (bypass for unsaved changes prompt).

<a name="PluginBlockSettingsMenuItem" href="#PluginBlockSettingsMenuItem">#</a> **PluginBlockSettingsMenuItem**

Renders a new item in the block settings menu.

_Usage_

```js
// Using ES5 syntax
var __ = wp.i18n.__;
var PluginBlockSettingsMenuItem = wp.editPost.PluginBlockSettingsMenuItem;

function doOnClick(){
	// To be called when the user clicks the menu item.
}

function MyPluginBlockSettingsMenuItem() {
	return wp.element.createElement(
		PluginBlockSettingsMenuItem,
		{
			allowedBlocks: [ 'core/paragraph' ],
			icon: 'dashicon-name',
			label: __( 'Menu item text' ),
			onClick: doOnClick,
		}
	);
}
```

```jsx
// Using ESNext syntax
import { __ } from wp.i18n;
import { PluginBlockSettingsMenuItem } from wp.editPost;

const doOnClick = ( ) => {
    // To be called when the user clicks the menu item.
};

const MyPluginBlockSettingsMenuItem = () => (
    <PluginBlockSettingsMenuItem
		allowedBlocks={ [ 'core/paragraph' ] }
		icon='dashicon-name'
		label={ __( 'Menu item text' ) }
		onClick={ doOnClick } />
);
```

_Parameters_

-   _props_ `Object`: Component props.
-   _props.allowedBlocks_ `[Array]`: An array containing a list of block names for which the item should be shown. If not present, it'll be rendered for any block. If multiple blocks are selected, it'll be shown if and only if all of them are in the whitelist.
-   _props.icon_ `[WPBlockTypeIconRender]`: The [Dashicon](https://developer.wordpress.org/resource/dashicons/) icon slug string, or an SVG WP element.
-   _props.label_ `string`: The menu item text.
-   _props.onClick_ `Function`: Callback function to be executed when the user click the menu item.
-   _props.small_ `[boolean]`: Whether to render the label or not.
-   _props.role_ `[string]`: The ARIA role for the menu item.

_Returns_

-   `WPComponent`: The component to be rendered.

<a name="PluginDocumentSettingPanel" href="#PluginDocumentSettingPanel">#</a> **PluginDocumentSettingPanel**

Renders items below the Status & Availability panel in the Document Sidebar.

_Usage_

```js
// Using ES5 syntax
var el = wp.element.createElement;
var __ = wp.i18n.__;
var registerPlugin = wp.plugins.registerPlugin;
var PluginDocumentSettingPanel = wp.editPost.PluginDocumentSettingPanel;

function MyDocumentSettingPlugin() {
	return el(
		PluginDocumentSettingPanel,
		{
			className: 'my-document-setting-plugin',
			title: 'My Panel',
		},
		__( 'My Document Setting Panel' )
	);
}

registerPlugin( 'my-document-setting-plugin', {
		render: MyDocumentSettingPlugin
} );
```

```jsx
// Using ESNext syntax
const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;

const MyDocumentSettingTest = () => (
		<PluginDocumentSettingPanel className="my-document-setting-plugin" title="My Panel">
		<p>My Document Setting Panel</p>
	</PluginDocumentSettingPanel>
);

 registerPlugin( 'document-setting-test', { render: MyDocumentSettingTest } );
```

_Parameters_

-   _props_ `Object`: Component properties.
-   _props.name_ `[string]`: The machine-friendly name for the panel.
-   _props.className_ `[string]`: An optional class name added to the row.
-   _props.title_ `[string]`: The title of the panel
-   _props.icon_ `[WPBlockTypeIconRender]`: The [Dashicon](https://developer.wordpress.org/resource/dashicons/) icon slug string, or an SVG WP element, to be rendered when the sidebar is pinned to toolbar.

_Returns_

-   `WPComponent`: The component to be rendered.

<a name="PluginMoreMenuItem" href="#PluginMoreMenuItem">#</a> **PluginMoreMenuItem**

Renders a menu item in `Plugins` group in `More Menu` drop down, and can be used to as a button or link depending on the props provided.
The text within the component appears as the menu item label.

_Usage_

```js
// Using ES5 syntax
var __ = wp.i18n.__;
var PluginMoreMenuItem = wp.editPost.PluginMoreMenuItem;
var moreIcon = wp.element.createElement( 'svg' ); //... svg element.

function onButtonClick() {
	alert( 'Button clicked.' );
}

function MyButtonMoreMenuItem() {
	return wp.element.createElement(
		PluginMoreMenuItem,
		{
			icon: moreIcon,
			onClick: onButtonClick,
		},
		__( 'My button title' )
	);
}
```

```jsx
// Using ESNext syntax
import { __ } from '@wordpress/i18n';
import { PluginMoreMenuItem } from '@wordpress/edit-post';
import { more } from '@wordpress/icons';

function onButtonClick() {
	alert( 'Button clicked.' );
}

const MyButtonMoreMenuItem = () => (
	<PluginMoreMenuItem
		icon={ more }
		onClick={ onButtonClick }
	>
		{ __( 'My button title' ) }
	</PluginMoreMenuItem>
);
```

_Parameters_

-   _props_ `Object`: Component properties.
-   _props.href_ `[string]`: When `href` is provided then the menu item is represented as an anchor rather than button. It corresponds to the `href` attribute of the anchor.
-   _props.icon_ `[WPBlockTypeIconRender]`: The [Dashicon](https://developer.wordpress.org/resource/dashicons/) icon slug string, or an SVG WP element, to be rendered to the left of the menu item label.
-   _props.onClick_ `[Function]`: The callback function to be executed when the user clicks the menu item.
-   _props.other_ `[...*]`: Any additional props are passed through to the underlying [MenuItem](/packages/components/src/menu-item/README.md) component.

_Returns_

-   `WPComponent`: The component to be rendered.

<a name="PluginPostPublishPanel" href="#PluginPostPublishPanel">#</a> **PluginPostPublishPanel**

Renders provided content to the post-publish panel in the publish flow
(side panel that opens after a user publishes the post).

_Usage_

```js
// Using ES5 syntax
var __ = wp.i18n.__;
var PluginPostPublishPanel = wp.editPost.PluginPostPublishPanel;

function MyPluginPostPublishPanel() {
	return wp.element.createElement(
		PluginPostPublishPanel,
		{
			className: 'my-plugin-post-publish-panel',
			title: __( 'My panel title' ),
			initialOpen: true,
		},
		__( 'My panel content' )
	);
}
```

```jsx
// Using ESNext syntax
const { __ } = wp.i18n;
const { PluginPostPublishPanel } = wp.editPost;

const MyPluginPostPublishPanel = () => (
	<PluginPostPublishPanel
		className="my-plugin-post-publish-panel"
		title={ __( 'My panel title' ) }
		initialOpen={ true }
	>
        { __( 'My panel content' ) }
	</PluginPostPublishPanel>
);
```

_Parameters_

-   _props_ `Object`: Component properties.
-   _props.className_ `[string]`: An optional class name added to the panel.
-   _props.title_ `[string]`: Title displayed at the top of the panel.
-   _props.initialOpen_ `[boolean]`: Whether to have the panel initially opened. When no title is provided it is always opened.
-   _props.icon_ `[WPBlockTypeIconRender]`: The [Dashicon](https://developer.wordpress.org/resource/dashicons/) icon slug string, or an SVG WP element, to be rendered when the sidebar is pinned to toolbar.

_Returns_

-   `WPComponent`: The component to be rendered.

<a name="PluginPostStatusInfo" href="#PluginPostStatusInfo">#</a> **PluginPostStatusInfo**

Renders a row in the Status & visibility panel of the Document sidebar.
It should be noted that this is named and implemented around the function it serves
and not its location, which may change in future iterations.

_Usage_

```js
// Using ES5 syntax
var __ = wp.i18n.__;
var PluginPostStatusInfo = wp.editPost.PluginPostStatusInfo;

function MyPluginPostStatusInfo() {
	return wp.element.createElement(
		PluginPostStatusInfo,
		{
			className: 'my-plugin-post-status-info',
		},
		__( 'My post status info' )
	)
}
```

```jsx
// Using ESNext syntax
const { __ } = wp.i18n;
const { PluginPostStatusInfo } = wp.editPost;

const MyPluginPostStatusInfo = () => (
	<PluginPostStatusInfo
		className="my-plugin-post-status-info"
	>
		{ __( 'My post status info' ) }
	</PluginPostStatusInfo>
);
```

_Parameters_

-   _props_ `Object`: Component properties.
-   _props.className_ `[string]`: An optional class name added to the row.
-   _props.children_ `WPElement`: Children to be rendered.

_Returns_

-   `WPComponent`: The component to be rendered.

<a name="PluginPrePublishPanel" href="#PluginPrePublishPanel">#</a> **PluginPrePublishPanel**

Renders provided content to the pre-publish side panel in the publish flow
(side panel that opens when a user first pushes "Publish" from the main editor).

_Usage_

```js
// Using ES5 syntax
var __ = wp.i18n.__;
var PluginPrePublishPanel = wp.editPost.PluginPrePublishPanel;

function MyPluginPrePublishPanel() {
	return wp.element.createElement(
		PluginPrePublishPanel,
		{
			className: 'my-plugin-pre-publish-panel',
			title: __( 'My panel title' ),
			initialOpen: true,
		},
		__( 'My panel content' )
	);
}
```

```jsx
// Using ESNext syntax
const { __ } = wp.i18n;
const { PluginPrePublishPanel } = wp.editPost;

const MyPluginPrePublishPanel = () => (
	<PluginPrePublishPanel
		className="my-plugin-pre-publish-panel"
		title={ __( 'My panel title' ) }
		initialOpen={ true }
	>
	    { __( 'My panel content' ) }
	</PluginPrePublishPanel>
);
```

_Parameters_

-   _props_ `Object`: Component props.
-   _props.className_ `[string]`: An optional class name added to the panel.
-   _props.title_ `[string]`: Title displayed at the top of the panel.
-   _props.initialOpen_ `[boolean]`: Whether to have the panel initially opened. When no title is provided it is always opened.
-   _props.icon_ `[WPBlockTypeIconRender]`: The [Dashicon](https://developer.wordpress.org/resource/dashicons/) icon slug string, or an SVG WP element, to be rendered when the sidebar is pinned to toolbar.

_Returns_

-   `WPComponent`: The component to be rendered.

<a name="PluginSidebar" href="#PluginSidebar">#</a> **PluginSidebar**

Renders a sidebar when activated. The contents within the `PluginSidebar` will appear as content within the sidebar.
If you wish to display the sidebar, you can with use the `PluginSidebarMoreMenuItem` component or the `wp.data.dispatch` API:

```js
wp.data.dispatch( 'core/edit-post' ).openGeneralSidebar( 'plugin-name/sidebar-name' );
```

_Related_

-   PluginSidebarMoreMenuItem

_Usage_

```js
// Using ES5 syntax
var __ = wp.i18n.__;
var el = wp.element.createElement;
var PanelBody = wp.components.PanelBody;
var PluginSidebar = wp.editPost.PluginSidebar;
var moreIcon = wp.element.createElement( 'svg' ); //... svg element.

function MyPluginSidebar() {
	return el(
			PluginSidebar,
			{
				name: 'my-sidebar',
				title: 'My sidebar title',
				icon: moreIcon,
			},
			el(
				PanelBody,
				{},
				__( 'My sidebar content' )
			)
	);
}
```

```jsx
// Using ESNext syntax
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { PluginSidebar } from '@wordpress/edit-post';
import { more } from '@wordpress/icons';

const MyPluginSidebar = () => (
	<PluginSidebar
		name="my-sidebar"
		title="My sidebar title"
		icon={ more }
	>
		<PanelBody>
			{ __( 'My sidebar content' ) }
		</PanelBody>
	</PluginSidebar>
);
```

_Parameters_

-   _props_ `Object`: Element props.
-   _props.name_ `string`: A string identifying the sidebar. Must be unique for every sidebar registered within the scope of your plugin.
-   _props.className_ `[string]`: An optional class name added to the sidebar body.
-   _props.title_ `string`: Title displayed at the top of the sidebar.
-   _props.isPinnable_ `[boolean]`: Whether to allow to pin sidebar to toolbar.
-   _props.icon_ `[WPBlockTypeIconRender]`: The [Dashicon](https://developer.wordpress.org/resource/dashicons/) icon slug string, or an SVG WP element, to be rendered when the sidebar is pinned to toolbar.

<a name="PluginSidebarMoreMenuItem" href="#PluginSidebarMoreMenuItem">#</a> **PluginSidebarMoreMenuItem**

Renders a menu item in `Plugins` group in `More Menu` drop down,
and can be used to activate the corresponding `PluginSidebar` component.
The text within the component appears as the menu item label.

_Usage_

```js
// Using ES5 syntax
var __ = wp.i18n.__;
var PluginSidebarMoreMenuItem = wp.editPost.PluginSidebarMoreMenuItem;
var moreIcon = wp.element.createElement( 'svg' ); //... svg element.

function MySidebarMoreMenuItem() {
	return wp.element.createElement(
		PluginSidebarMoreMenuItem,
		{
			target: 'my-sidebar',
			icon: moreIcon,
		},
		__( 'My sidebar title' )
	)
}
```

```jsx
// Using ESNext syntax
import { __ } from '@wordpress/i18n';
import { PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { more } from '@wordpress/icons';

const MySidebarMoreMenuItem = () => (
	<PluginSidebarMoreMenuItem
		target="my-sidebar"
		icon={ more }
	>
		{ __( 'My sidebar title' ) }
	</PluginSidebarMoreMenuItem>
);
```

_Parameters_

-   _props_ `Object`: Component props.
-   _props.target_ `string`: A string identifying the target sidebar you wish to be activated by this menu item. Must be the same as the `name` prop you have given to that sidebar.
-   _props.icon_ `[WPBlockTypeIconRender]`: The [Dashicon](https://developer.wordpress.org/resource/dashicons/) icon slug string, or an SVG WP element, to be rendered to the left of the menu item label.

_Returns_

-   `WPComponent`: The component to be rendered.

<a name="reinitializeEditor" href="#reinitializeEditor">#</a> **reinitializeEditor**

Reinitializes the editor after the user chooses to reboot the editor after
an unhandled error occurs, replacing previously mounted editor element using
an initial state from prior to the crash.

_Parameters_

-   _postType_ `Object`: Post type of the post to edit.
-   _postId_ `Object`: ID of the post to edit.
-   _target_ `Element`: DOM node in which editor is rendered.
-   _settings_ `?Object`: Editor settings object.
-   _initialEdits_ `Object`: Programmatic edits to apply initially, to be considered as non-user-initiated (bypass for unsaved changes prompt).


<!-- END TOKEN(Autogenerated API docs) -->

<br/><br/><p align="center"><img src="https://s.w.org/style/images/codeispoetry.png?1" alt="Code is Poetry." /></p>