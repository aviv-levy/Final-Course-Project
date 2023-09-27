import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyResetPassword } from "../Services/ApiService";
import StyledInput from "../Components/StyledInput";
import { ResetPassword } from "../Services/Interfaces";

function ResetPasswordPage() {

    const navigate = useNavigate();
    const location = useLocation().pathname.split('/')[2];
    const [user, setUser] = useState<ResetPassword>({} as ResetPassword);
    const [errors, setError] = useState<string[]>([]);

    useEffect(() => {
        const verifyReset = async () => {
            await verifyResetPassword(location);
        }

        verifyReset().catch((err) => {
            if (err === 404) {
                navigate('/404');
                return;
            }
        });
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container-fluid mb-5">
            <div className="row justify-content-center">
                <div className="col-sm-6 col-md-4 mt-5">
                    <>
                        <div className="text-center mt-5 mb-4">

                            <h1>Change password</h1>
                        </div>
                        <StyledInput
                            type='password'
                            placeholder='New password'
                            setValueFunc={setUser}
                            inputParam='newPassword'
                            errorText={errors[0]} />

                        <StyledInput
                            type='password'
                            placeholder='Confirm new password'
                            setValueFunc={setUser}
                            inputParam='verifyNewPassword'
                            errorText={errors[0]} />
                        <div className="d-grid gap-2 mt-2">
                            <button className="btn btn-dark">Reset</button>
                        </div>
                    </>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;