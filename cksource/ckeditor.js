/**
 * @license Copyright (c) 2014-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import ListProperties from '@ckeditor/ckeditor5-list/src/listproperties.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableColumnResize from '@ckeditor/ckeditor5-table/src/tablecolumnresize.js';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
import Style from '@ckeditor/ckeditor5-style/src/style';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';



export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Alignment,
	Bold,
	Essentials,
	FontColor,
	FontFamily,
	FontSize,
	Heading,
	HorizontalLine,
	Underline,
	Image,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	List,
	ListProperties,
	Paragraph,
	Table,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	GeneralHtmlSupport,
	Style,
        PageBreak
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [	
			"style",
			'heading',
			'|',
			'fontColor',
			'fontFamily',
			'fontSize',
			'bold',
			'italic',
			'underline',
			'bulletedList',
			'numberedList',
			'horizontalLine',
                        'pagebreak',
			'|',
			'alignment',
			'outdent',
			'indent',
			'|',
			'imageUpload',
			'insertTable',
			'undo',
			'redo'
		]
	},
	language: 'en',
	image: {
		toolbar: [
			'imageTextAlternative',
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side'
		]
	},
        style: {
            definitions: [
                {
                    name: 'EWR_Base',
                    element: 'p',
                    classes: [ 'ewr-base' ]
                },
                {
                    name: 'EWR_Base',
                    element: 'ol',
                    classes: [ 'ewr-base' ]
                },
                {
                    name: 'EWR_ltr_fax_email',
                    element: 'p',
                    classes: [ 'ewr-ltr-fax-email' ]
                },
                {
                    name: 'EWR_fax_email',
                    element: 'p',
                    classes: [ 'ewr-fax-email' ]
                },
                {
                    name: 'EWR_ltr_re_1st',
                    element: 'p',
                    classes: [ 'ewr-ltr-re-1st' ]
                },
                {
                    name: 'EWR_ltr_re_2nd',
                    element: 'p',
                    classes: [ 'ewr-ltr-re-2nd' ]
                },
                {
                    name: 'EWR_doc_header',
                    element: 'p',
                    classes: [ 'ewr-doc-header' ]
                },
                {
                    name: 'EWR_doc_and_to_1st',
                    element: 'p',
                    classes: [ 'ewr-doc-and-to-1st' ]
                },
                {
                    name: 'EWR_doc_re_1st',
                    element: 'p',
                    classes: [ 'ewr-doc-re-1st' ]

                },
                {
                    name: 'EWR_doc_re_2nd',
                    element: 'p',
                    classes: [ 'ewr-doc-re-2nd' ]

                },
                {
                    name: 'EWR_doc_and_to_2nd',
                    element: 'p',
                    classes: [ 'ewr-doc-and-to-2nd' ]
                },
            ]
        },
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableCellProperties',
			'tableProperties'
		]
	}
};
