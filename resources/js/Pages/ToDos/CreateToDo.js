import React, {useState} from 'react';
import Helmet from 'react-helmet';
import {usePage} from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import ConfirmModal from '@/Shared/Modals/ConfirmModal';
import ModalWithButtons from '@/Shared/Modals/ModalWithButtons';
import LargeButton from "@/Shared/LargeButton";
import TextInput from "@/Shared/TextInput";
import {Inertia} from "@inertiajs/inertia";
import LoadingSmallButton from "@/Shared/LoadingSmallButton";

const CreateToModal = () => {

    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { errors } = usePage().props;
    const [sending, setSending] = useState(false);

    const [values, setValues] = useState({
        name: '',
    });

    let onConfirm = () => {
        alert("Confirmed");
    }

    let onNotConfirmed = () => {
        alert("Not confirmed");
    }

    let onShowConfirmModal = () => {
        setConfirmOpen(true);
    }

    let onShowDialogWithButtons = () => {
        setDialogIsOpen(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSending(true);

        Inertia.post(route('todos.storeFromToDoModal'), values, {
            preserveState: true,
            onSuccess: (page) => {
                setSending(false);
                setDialogIsOpen(false);
            },
            onError: (errors) => {
                setSending(false);
            }
        });
    }

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value
        }));
    }

    return (
        <div>
            {/* <Helmet>
                <title>Create ToDo</title>
            </Helmet> */}
            {/* <h1 className="mb-8 font-bold text-3xl">Modal Demo</h1> */}

            <div>
                {false &&
                <LargeButton className="btn-indigo ml-2"
                             onClick={onShowConfirmModal}>
                    Show Confirm Modal
                </LargeButton>
                }

                <LargeButton className="btn-indigo ml-2"
                        onClick={onShowDialogWithButtons}>
                    Create ToDo
                </LargeButton>

                <ConfirmModal
                    title="Delete Post?"
                    open={confirmOpen}
                    onClose={() => setConfirmOpen(false)}
                    onConfirm={onConfirm}
                    onReject={onNotConfirmed}
                >
                    Are you sure you want to delete this item?
                </ConfirmModal>

                <ModalWithButtons
                    title="Create ToDo"
                    open={dialogIsOpen}
                    onClose={() => setDialogIsOpen(false)}
                    onConfirm={() => setDialogIsOpen(false)}
                    buttons={
                        <React.Fragment>
                            <div className="p-1">
                                <LoadingSmallButton
                                    loading={sending}
                                    onClick={handleSubmit}
                                    className="btn-indigo ml-auto"
                                >
                                    Save
                                </LoadingSmallButton>
                            </div>
                        </React.Fragment>
                    }
                >
                    <div className="bg-white rounded shadow overflow-hidden max-w-3xl">
                        <form>
                            <div className="p-4 -mr-3 -mb-4 flex flex-wrap">
                                <TextInput
                                    className="pr-4 pb-4 w-full "
                                    label="Name"
                                    name="name"
                                    errors={errors.name}
                                    value={values.name}
                                    onChange={handleChange}
                                />


                            </div>

                        </form>
                    </div>

                </ModalWithButtons>
            </div>
        </div>
    );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
CreateToModal.layout = page => <Layout children={page}/>;

export default CreateToModal;

