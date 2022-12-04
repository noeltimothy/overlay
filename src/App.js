import React, { useState, useEffect, useRef } from "react";
import "./draggable.scss"
import "./CKTextArea.scss"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import $ from 'jquery';
import nouislider from 'nouislider';
import "./ck-styles.css";
import "./nouislider.min.css";
import "./newslide.css";
import { Rnd } from 'react-rnd';
import * as pdfjsLib from 'pdfjs-dist/build/pdf'
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

pdfjsLib.workerSrc = "pdfjs-dist/build/pdf.worker.js"

export default function App() {

	const [CKE, setCKE] = useState();
    	const [leftMargin, setLeftMargin] = useState(1)
    	const [rightMargin, setRightMargin] = useState(1)
        const [marginChange, setMarginChange] = useState(false);
	const px_factor = 96

	const initializeEditor = async (e) => {
		await setCKE(e);

		e.keystrokes.set( 'Tab', ( evt, cancel ) => {
                        e.model.change(writer => {
				writer.insert(writer.createText(' ', {bold: true, 'min-width': '30px'}), e.model.document.selection.getLastPosition(), 'end' );
                        })
			evt.preventDefault();
		});

		//Add List indent styles here
		var width = e.ui.view.element.children[2].clientWidth || 968
		var max_val = Math.floor(width/px_factor)

		// Load the ruler here, this is easier to debug if done during runtime in this component
		var content = $('.ck .ck-editor__main')[0]

                var slider_wrap = document.createElement('div');
                slider_wrap.setAttribute('id', 'slider');
                slider_wrap.setAttribute('class', 'slider');
                content.prepend(slider_wrap);
		var slider = nouislider.create(document.getElementById('slider'), {
			start: [leftMargin, max_val - rightMargin],
			connect: [ false, true, false ],
			limit: max_val,
     			tooltips: true,
			behaviour: 'drag',
			step: 0.25,
			range: { 'min': 0, 'max': max_val },
			pips: { mode: 'count', values: max_val, density: 1 }
		})

   		slider.on('change', async function (vals) {
			var left = vals[0]
			var right = vals[1]

			await setLeftMargin(left)
			await setRightMargin(max_val - right)
			await setMarginChange(true)
			e.editing.view.focus();
		})

                e.model.change( writer => {
			console.log ('in e.model model change')
                        set_cke_margins()
                })
    	}

    const drophere = async (event, editor) => {
        if (marginChange) {
		await set_cke_margins()
		await setMarginChange(false)
	}
    }

    const set_cke_margins = async() => {
	if (CKE) {

		console.log ('in set cke margins')
		console.log (rightMargin)

		CKE.editing.view.change( (writer) => {
			writer.setStyle(
				"padding-top",
				'30px',
				CKE.editing.view.document.getRoot()
			)
			writer.setStyle(
				"padding-bottom",
				'30px',
				CKE.editing.view.document.getRoot()
			)
			writer.setStyle(
				"padding-left",
				leftMargin * px_factor + 'px',
				CKE.editing.view.document.getRoot()
			)
			writer.setStyle(
				"padding-right",
				(rightMargin) * px_factor + 'px',
				CKE.editing.view.document.getRoot()
			)
		})
	}
    }

	const [isDraggerDisabled, setIsDraggerDisabled] = React.useState(false)
	const myElement = useRef();
	const canvasRef = useRef(null)
	const overlayRef = useRef(null)
	const [numPages, setNumPages] = useState(null);
        const [pageNumber, setPageNumber] = useState();
        const [pdfDoc, setPDFDoc] = useState()

        async function renderPage(pageNum) {
                console.log('render page called on page:' + pageNum)
                pdfDoc && pdfDoc.getPage(pageNum).then(function (page) {

                        ///////////////////////
                        const viewport = page.getViewport({ scale: 1.5 });
                        const canvas = canvasRef.current;
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        canvas.style.width = '100%';

                        const renderContext = {
                                canvasContext: canvas.getContext('2d'),
                                viewport: viewport
                        };

                        page.render(renderContext);

                })
        }

        useEffect(() => {
                pdfDoc && renderPage(pageNumber)
        }, [pageNumber])

    const loadPDF = (e) => {
        let loadingTask = pdfjsLib.getDocument(window.URL.createObjectURL(e.target.files[0]))
        loadingTask.promise.then(pdf => {
            setPDFDoc(pdf)
            setNumPages(pdf.numPages)
            setPageNumber(1)
        })
    }

    const [rnd, setRND] = useState()

    const createRND = (e) => {
	
	setRND(
		<Rnd
      		default={{
        		x: 150,
        		y: 205,
        		width: 190,
        		height: 50,
      		}}
		id = 'draggable'
      		minWidth={190}
      		minHeight={50}
      		bounds="parent"
   		 >
		<div> {'{{Buyer.Name}}'} </div>
    		</Rnd>
	)
    }

    return (
    <>
        <input type='file' onChange={loadPDF} />
        <div className='App'>
        <div className='leftpane'>
		<Rnd
      		default={{
        		x: 150,
        		y: 205,
        		width: 190,
        		height: 50,
      		}}
		id = 'draggable'
      		minWidth={190}
      		minHeight={50}
      		bounds="parent"
   		 >
		<div> {'{{Buyer.Name}}'} </div>
    		</Rnd>
	</div>

	<div className='Pdfviewer' onMouseUp={createRND}>	
                <canvas
                 	ref={canvasRef}
                 	className='background'
                />
		{rnd}
	</div>

        </div>
    </>
    );
}
