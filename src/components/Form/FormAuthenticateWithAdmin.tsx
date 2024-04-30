import React, {useState} from 'react';
import BoxForm from "@/components/Core/BoxForm";
import {schemaLogin} from "@/config/validate";
import WithLogin from "@/components/Auth/WithLogin";

const Login = () => {

    return (
        <><WithLogin /></>
    )
};

const FormAuthenticateWithAdmin = () => {
    return (
        <BoxForm schema={schemaLogin}>
            <Login/>
        </BoxForm>
    )
}

export default FormAuthenticateWithAdmin;
