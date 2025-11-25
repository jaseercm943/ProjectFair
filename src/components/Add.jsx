import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { addProjectAPI } from "../services/allApi";
import { addResponseContext } from "../context/Context";

function Add() {
    const { setaddProjectResponse } = useContext(addResponseContext);
    const [projectDetails, setprojectDetails] = useState({
        image: "",
        title: "",
        lang: "",
        github: "",
        weblink: "",
        overview: "",
    });
    console.log(projectDetails);

    const [show, setShow] = useState(false);

    const [isinvalidImageStatus, setisinvalidImageStatus] = useState(true);

    const [preview, setpreview] = useState(
        "https://png.pngtree.com/png-clipart/20190920/original/pngtree-file-upload-icon-png-image_4646955.jpg"
    );

    useEffect(() => {
        let Img = projectDetails.image.type;
        if (Img == "image/png" || Img == "image/jpg" || Img == "image/jpeg") {
            setisinvalidImageStatus(false);
            console.log(URL.createObjectURL(projectDetails.image));

            setpreview(URL.createObjectURL(projectDetails.image));
        } else {
            setisinvalidImageStatus(true);
            projectDetails.image = "";
        }
    }, [projectDetails.image]);

    const handleClose = () => {
        //when modal is closed
        setShow(false);
        setprojectDetails({ image: "", title: "", lang: "", github: "", weblink: "", overview: "" });
        setisinvalidImageStatus(true);
        setpreview(
            "https://png.pngtree.com/png-clipart/20190920/original/pngtree-file-upload-icon-png-image_4646955.jpg"
        );
    };

    const handleShow = () => setShow(true);

    const handleUpload = async () => {
        const { image, title, lang, github, weblink, overview } = projectDetails;

        const reqBody = new FormData();
        reqBody.append("picture", image);
        reqBody.append("title", title);
        reqBody.append("lang", lang);
        reqBody.append("github", github);
        reqBody.append("weblink", weblink);
        reqBody.append("overview", overview);

        if (image && title && lang && github && weblink && overview) {
            const token = sessionStorage.getItem("token");

            if (token) {
                const reqheader = {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                };
                try {
                    const result = await addProjectAPI(reqBody, reqheader);
                    console.log(result);
                    if (result.status == 200) {
                        setaddProjectResponse(result.data);
                        handleClose();
                    } else {
                        toast.error(`${result.data}`);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            toast.error("Enter complete Details");
        }
    };
    return (
        <>
            <button className="btn btn-success fw-bold fs-5" onClick={handleShow}>
                <span className="fw-bold">+</span> New Project
            </button>

            <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="bg-secondary">New Project Details!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-6">
                            <label>
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(e) => setprojectDetails({ ...projectDetails, image: e.target.files[0] })}
                                />
                                <img src={preview} width={"300px"} className="text-light" alt="" />
                            </label>

                            {isinvalidImageStatus && (
                                <p className="text-warning">*Upload only the following file type(jpeg,jpg,png)</p>
                            )}
                        </div>
                        <div className="col-6">
                            {/* accessing the values of project details */}
                            <input
                                onChange={(e) => setprojectDetails({ ...projectDetails, title: e.target.value })}
                                type="text"
                                className="form-control mb-3"
                                placeholder="Project Title"
                            />
                            <input
                                onChange={(e) => setprojectDetails({ ...projectDetails, lang: e.target.value })}
                                type="text"
                                className="form-control mb-3"
                                placeholder="Languages Used"
                            />
                            <input
                                onChange={(e) => setprojectDetails({ ...projectDetails, github: e.target.value })}
                                type="text"
                                className="form-control mb-3"
                                placeholder="Project Github Link"
                            />
                            <input
                                onChange={(e) => setprojectDetails({ ...projectDetails, weblink: e.target.value })}
                                type="text"
                                className="form-control mb-3"
                                placeholder="Project Website link"
                            />
                        </div>
                    </div>
                    <div>
                        {/* accessing the values of project details */}
                        <input
                            onChange={(e) => setprojectDetails({ ...projectDetails, overview: e.target.value })}
                            type="text"
                            className="form-control mb-3"
                            placeholder="Project Overview"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleUpload} variant="primary">
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Add;
