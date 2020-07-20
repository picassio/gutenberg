/**
 * External dependencies
 */
import React from 'react';
import { compact } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Picker } from '@wordpress/components';
import {
	requestMediaEditor,
	mediaSources,
} from '@wordpress/react-native-bridge';

export const MEDIA_TYPE_IMAGE = 'image';

export const MEDIA_EDITOR = 'MEDIA_EDITOR';

const editOption = {
	id: MEDIA_EDITOR,
	value: MEDIA_EDITOR,
	label: __( 'Edit' ),
	types: [ MEDIA_TYPE_IMAGE ],
};

const replaceOption = {
	id: mediaSources.deviceLibrary,
	value: mediaSources.deviceLibrary,
	label: __( 'Replace' ),
	types: [ MEDIA_TYPE_IMAGE ],
};

export class MediaEdit extends React.Component {
	constructor( props ) {
		super( props );
		this.onPickerPresent = this.onPickerPresent.bind( this );
		this.onPickerSelect = this.onPickerSelect.bind( this );
		this.getMediaOptionsItems = this.getMediaOptionsItems.bind( this );
		this.getDestructiveButtonIndex = this.getDestructiveButtonIndex.bind(
			this
		);
	}

	getMediaOptionsItems() {
		const { pickerOptions } = this.props;

		return compact( [
			editOption,
			replaceOption,
			...( pickerOptions ? pickerOptions : [] ),
		] );
	}

	getDestructiveButtonIndex() {
		const options = this.getMediaOptionsItems();
		const destructiveButtonIndex = options.findIndex(
			( option ) => option?.destructiveButton
		);

		return destructiveButtonIndex !== -1
			? destructiveButtonIndex + 1
			: undefined;
	}

	onPickerPresent() {
		if ( this.picker ) {
			this.picker.presentPicker();
		}
	}

	onPickerSelect( value ) {
		const { onSelect, pickerOptions, multiple = false } = this.props;

		switch ( value ) {
			case MEDIA_EDITOR:
				requestMediaEditor( this.props.source.uri, ( media ) => {
					if ( ( multiple && media ) || ( media && media.id ) ) {
						onSelect( media );
					}
				} );
				break;
			default:
				const optionSelected = pickerOptions.find(
					( option ) => option.id === value
				);

				if ( optionSelected && optionSelected.onPress ) {
					optionSelected.onPress();
					return;
				}

				this.props.openReplaceMediaOptions();
		}
	}

	render() {
		const mediaOptions = () => (
			<Picker
				hideCancelButton
				ref={ ( instance ) => ( this.picker = instance ) }
				options={ this.getMediaOptionsItems() }
				leftAlign={ true }
				onChange={ this.onPickerSelect }
				// translators: %s: block title e.g: "Paragraph".
				title={ __( 'Media options' ) }
				destructiveButtonIndex={ this.getDestructiveButtonIndex() }
			/>
		);

		return this.props.render( {
			open: this.onPickerPresent,
			mediaOptions,
		} );
	}
}

export default MediaEdit;
