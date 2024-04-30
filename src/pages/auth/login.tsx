import React, {useEffect} from 'react';
import BoxForm from "@/components/Core/BoxForm";
import {schemaLogin} from "@/config/validate";
import FormAuthenticateWithAdmin from "@/components/Form/FormAuthenticateWithAdmin";
import {useRouter} from "next/router";

const FormAuthenticateAdmin = () => {
    return (
        <FormAuthenticateWithAdmin />
    )
}
const Login = () => {

    return (
        <div>
            <BoxForm schema={schemaLogin} >
                <FormAuthenticateAdmin/>
            </BoxForm>
        </div>
    );
};

export default Login;
