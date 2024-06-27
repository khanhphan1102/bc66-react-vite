

import React, { useState } from 'react'

const defaultValue = {
    maSv: '',
    fullName: '',
    phone: '',
    email: '',
};

const ExReactForm = () => {

    const [formInput, setFormInput] = useState(defaultValue);

    const [formError, setFormError] = useState(defaultValue);

    const [listSv, setListSv] = useState([]);

    const [searchInput, setSearchInput] = useState('');


    const handleOnChange = (event) => {
        const { value, name, required } = event.target;

        const newError = { ...formError }
        //.trim() space error
        if (!value.trim()) {
            if (required) {
                newError[name] = "Không được để trống";
            }
        } else {

            newError[name] = '';
        }

        setFormError(newError)
        setFormInput({ ...formInput, [name]: value })

    };

    const handleOnBlur = (event) => {
        const { value, name, required, pattern } = event.target;

        const newError = { ...formError }
        //.trim() space error
        if (!value.trim()) {
            if (required) {
                newError[name] = "Vui lòng nhập thông tin";
            }
        } else {
            if (pattern) {
                // regex email, validate emmail
                const regex = new RegExp(pattern);
                //kiểm tra true/false
                const isValid = regex.test(value);
                if (!isValid) {
                    if (name === "email") {
                        newError[name] = "Sai định dạng email"
                    } else if (name === "phone") {
                        newError[name] = "Sai định dạng số điện thoại"
                    } else if (name === "fullName") {
                        newError[name] = "Họ và tên không đúng / Vd: Nguyễn Văn A"
                    }

                } else {
                    newError[name] = ''
                }
                console.log('isValid: ', isValid);
            } else {
                newError[name] = ''
            }

        }

        setFormError(newError)

    };

    const onSubmit = (event) => {

        event.preventDefault();
    };

    //Add
    const handleAdd = (sv) => {

        setListSv([...listSv, sv]);
        setFormInput(defaultValue);
        setSearchInput(searchInput);
    };

    // Search
    const handleSearchInput = (event) => {
        const newSearchInput = event.target.value
        setSearchInput(newSearchInput)

    };

    //filterListSv
    const filteredListSv = listSv.filter((sv) => {
        return (
            sv.maSv.toString().includes(searchInput) ||
            sv.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
            sv.phone.includes(searchInput) ||
            sv.email.toLowerCase().includes(searchInput.toLowerCase())
        );
    });



    return (

        <div className="container max-w-screen-lg mx-auto">
            <h1 className="w-full text-xl text-center text-white dark:bg-gray-700 p-5">Thông tin Sinh Viên</h1>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-3 ">
                <div className=" gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div className="col-span-2">
                        <form onSubmit={onSubmit}>
                            <div className="gap-4 gap-y-4 text-sm">
                                <div className='flex justify-evenly gap-3 h-24'>
                                    <div className="md:col-span-5">
                                        <label htmlFor="ma_sv">
                                            <h2>
                                                Mã SV
                                            </h2>
                                        </label>
                                        <input
                                            type="number"
                                            name="maSv"
                                            id="maSv"
                                            className="h-10 border mt-1 rounded px-4 w-96 bg-gray-50"
                                            onChange={handleOnChange}
                                            value={formInput.maSv}
                                            onBlur={handleOnBlur}
                                            required={true}
                                        />
                                        {formError.maSv && (
                                            <p className=' text-red-600 text-sm text-start mt-2'>{formError.maSv}</p>)}
                                    </div>
                                    <div className="md:col-span-5">
                                        <label htmlFor="full_name">
                                            <h2>
                                                Họ và tên
                                            </h2>
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            id="fullName"
                                            className="h-10 border mt-1 rounded px-4 w-96 bg-gray-50"
                                            value={formInput.fullName}
                                            onChange={handleOnChange}
                                            onBlur={handleOnBlur}
                                            required={true}
                                            pattern='^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$'
                                        />
                                        {formError.fullName && (
                                            <p className=' text-red-600 text-sm text-start mt-2'>{formError.fullName}</p>)}
                                    </div>
                                </div>

                                <div className="flex justify-evenly gap-3 h-24">
                                    <div className="md:col-span-5">
                                        <label htmlFor="full_name">
                                            <h2>
                                                Số điện thoại
                                            </h2>
                                        </label>
                                        <input
                                            type="number"
                                            name="phone"
                                            className="h-10 border mt-1 rounded px-4 w-96 bg-gray-50"
                                            value={formInput.phone}
                                            onChange={handleOnChange}
                                            onBlur={handleOnBlur}
                                            required={true}
                                            pattern='^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$'
                                        />
                                        {formError.phone && (
                                            <p className=' text-red-600 text-sm text-start mt-2'>{formError.phone}</p>)}
                                    </div>
                                    <div className="md:col-span-5">
                                        <label htmlFor="full_name">
                                            <h2>
                                                Email
                                            </h2>
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            className="h-10 border mt-1 rounded px-4 w-96 bg-gray-50"
                                            value={formInput.email}
                                            onChange={handleOnChange}
                                            onBlur={handleOnBlur}
                                            required={true}
                                            pattern='^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$'
                                        />
                                        {formError.email && (
                                            <p className=' text-red-600 text-sm text-start mt-2'>{formError.email}</p>)}
                                    </div>
                                </div>
                                <div className="md:col-span-5 text-end mt-5">
                                    <button
                                        type="submit"
                                        className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => { handleAdd(formInput) }}
                                    >
                                        Thêm sinh viên
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-3 grid-flow-col">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="h-10 border mt-1 rounded px-4 bg-gray-50"
                    name="search"
                    value={searchInput}
                    onChange={handleSearchInput}

                />


            </div>

            <div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Mã Sv
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Họ và tên
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Số điện thoại
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                            </tr>
                        </thead>

                        {filteredListSv.length > 0 ? (
                            filteredListSv.map((sv) => (
                                <tbody key={sv.maSv}>
                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                            {sv.maSv}
                                        </th>
                                        <td className="px-6 py-4 text-black whitespace-nowrap">
                                            {sv.fullName}
                                        </td>
                                        <td className="px-6 py-4 text-black whitespace-nowrap">
                                            {sv.phone}
                                        </td>
                                        <td className="px-6 py-4 text-black whitespace-nowrap">
                                            {sv.email}
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        ) : (

                            <tbody>
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center">
                                    Danh sách trống
                                </td>
                            </tr>
                        </tbody>
                        )}

                    </table>
                </div>
            </div>
        </div>

    );
};

export default ExReactForm