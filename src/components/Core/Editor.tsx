import React, {MutableRefObject, useEffect, useMemo, useRef, useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import ReactQuill, {ReactQuillProps} from "react-quill";
import {generateRandomString} from "@/utils/help";
import storage from "@/services/firebase/storage";
import useFormService from "@/hooks/useFormService";
import {Controller, useController} from "react-hook-form";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";
import {IReactWithChildren} from "@/types";
import {InputFieldProps} from "@/components/Core/Field/InputField";
import {formats} from "@/config/constant";

const Editor: React.ComponentType<ReactQuillProps & { forwardedRef: React.MutableRefObject<ReactQuill> }> = dynamic(
    async (): Promise<React.FC<ReactQuillProps & { forwardedRef: MutableRefObject<ReactQuill> }>> => {
        const {default: RQ} = await import("react-quill");
        // @ts-ignore
        RQ.Quill.register('modules/imageResize', require('quill-image-resize-module-react'));
        // eslint-disable-next-line react/display-name
        return ({forwardedRef, ...props}) => <RQ ref={forwardedRef} {...props} />;
    },
    {
        ssr: false
    }
);

const QuillToolbar = () => (
    <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select>
      <select className="ql-size" defaultValue="medium">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium">Size 3</option>
        <option value="large">Size 4</option>
      </select>
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
      </select>
    </span>
        <span className="ql-formats">
      <button className="ql-bold"/>
      <button className="ql-italic"/>
      <button className="ql-underline"/>
      <button className="ql-strike"/>
    </span>
        <span className="ql-formats">
      <button className="ql-list" value="ordered"/>
      <button className="ql-list" value="bullet"/>
      <button className="ql-indent" value="-1"/>
      <button className="ql-indent" value="+1"/>
    </span>
        <span className="ql-formats">
      <button className="ql-script" value="super"/>
      <button className="ql-script" value="sub"/>
      <button className="ql-blockquote"/>
      <button className="ql-direction"/>
    </span>
        <span className="ql-formats">
      <select className="ql-align"/>
      <select className="ql-color"/>
      <select className="ql-background"/>
    </span>
        <span className="ql-formats">
      <button className="ql-link"/>
      <button className="ql-image"/>
      <button className="ql-video"/>
    </span>
        <span className="ql-formats">
      <button className="ql-formula"/>
      <button className="ql-code-block"/>
      <button className="ql-clean"/>
    </span>
    </div>
);

const QuillEditor:IReactWithChildren<InputFieldProps> = ({name, label, callBack,className,children, ...rest}) => {
    const {control, setValue,values, trigger} = useFormService();
    const {
        fieldState: {error},
    } = useController({name, control});
    const quillRef: MutableRefObject<ReactQuill> = useRef<any>();
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                ['blockquote', 'code-block'],
                ['link', 'image'],
                ['clean'],
            ],
            imageResize: {
                modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
            },
            handlers: {
                image: () => {
                    if (quillRef.current) {
                        setValue("is_uploading",true);
                        const editor = quillRef.current.getEditor();
                        const input = document.createElement("input");
                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "image/*");
                        input.click();
                        // @ts-ignore
                        input.onchange = async (event: React.ChangeEvent<HTMLInputElement>) => {
                            if (event.target.files) {
                                let url = await storage.putFile(event.target.files[0], `image/${generateRandomString(20)}.png`);
                                // @ts-ignore
                                editor.insertEmbed(editor.getSelection(), "image", url);
                                setValue("is_uploading",false);
                            }
                        };
                    }
                },
            },
        },
        clipboard: {
            matchVisual: false,
        },
    }), []);

    const onBlur = (value:any, field: ControllerRenderProps<any, any>) => {
        field.onChange(value ==="<p><br></p>"?"":value);
        trigger(name);
    };

    return (
        <div className={className}>
            <div >
                {label &&
                    <label htmlFor={name} className="truncate block text-sm font-medium leading-6 text-gray-900">
                        {label}
                    </label>
                }
                <Controller
                    control={control}
                    name={name}
                    render={({field}) => (
                        <>
                            <Editor
                                id={name}
                                forwardedRef={quillRef}
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                value={values[name]}
                                onChange={(value)=>onBlur(value,field)}
                            />
                        </>
                    )}
                />
                {children}
            </div>
            <div>
                {error && <p role="alert" className={"mt-2 text-red-400"}>{error?.message}</p>}
            </div>
        </div>

    );
}

export default QuillEditor;
