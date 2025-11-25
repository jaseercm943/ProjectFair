import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SERVERURL from "../services/serverurl";
import { editProjectAPI } from "../services/allApi";
import { editResponseContext } from "../context/Context";
import { toast } from "react-toastify";

function Edit({ projects }) {
    console.log(projects.picture);

    const { seteditProjectResponse } = useContext(editResponseContext);

    //setting state for Initial the view of fields in Edit component
    const [projectDetails, setprojectDetails] = useState({
        id: projects?._id,
        image: "",
        title: projects?.title,
        lang: projects?.lang,
        github: projects?.github,
        weblink: projects?.weblink,
        overview: projects?.overview,
    });

    const [show, setShow] = useState(false);
    
    const [preview, setpreview] = useState("");

   
    const [isinvalidImageStatus, setisinvalidImageStatus] = useState(true);

    
    useEffect(() => {
        
        if (
            projectDetails.image.type == "image/png" ||
            projectDetails.image.type == "image/jpg" ||
            projectDetails.image.type == "image/jpeg"
        ) {
            setisinvalidImageStatus(false); 

          
            setpreview(URL.createObjectURL(projectDetails.image));
        } else {
            setpreview("");
            setisinvalidImageStatus(true);
            setprojectDetails({ ...projectDetails, image: "" });
        }

       
    }, [projectDetails.image]);

    //when modal is closed
    const handleClose = () => {
        setShow(false);
        
        setprojectDetails({
            id: projects?._id,
            image: "",
            title: projects?.title,
            lang: projects?.lang,
            github: projects?.github,
            weblink: projects?.weblink,
            overview: projects?.overview,
        });
    };
    //when modal is opened
    const handleShow = () => {
        setShow(true);
        //to show the latest updated values in the modal when edit component loads
        setprojectDetails({
            id: projects?._id,
            image: "",
            title: projects?.title,
            lang: projects?.lang,
            github: projects?.github,
            weblink: projects?.weblink,
            overview: projects?.overview,
        });
    };

    //Updation of current project of the user logged in
    const handleUpdate = async () => {
        const { id, image, title, lang, github, weblink, overview } = projectDetails;

        const reqBody = new FormData(); // FormData() is a class used to set request body if multimedia files included

        //the key names set inside append() is destructured in server while adding...
        reqBody.append("title", title);
        reqBody.append("lang", lang);
        reqBody.append("github", github);
        reqBody.append("weblink", weblink);
        reqBody.append("overview", overview);

        //When User Choosed to Update Image then That Image is Passed Through Request Body
        preview ? reqBody.append("picture", image) : reqBody.append("picture", projects?.picture);

        if (title && lang && github && weblink && overview) {
          
            const token = sessionStorage.getItem("token");
            
            if (token) {
               
                const reqheader = {
                    
                    "Content-Type": preview ? "multipart/form-data" : "application/json",
                    Authorization: `Bearer ${token}`,
                };

                try {
                    //passing the edited project details of the user to server
                    const result = await editProjectAPI(id, reqBody, reqheader);
                    console.log(result);
                   
                    if (result.status == 200) {
                        
                        seteditProjectResponse(result.data);
                        handleClose();
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
        <div>
            <button className="btn fw-bolder border border" onClick={handleShow}>
                Edit
            </button>

            <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="bg-secondary">New Project Details!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-6">
                            <label>
                                {/* accessing the image input by user  */}
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(e) => setprojectDetails({ ...projectDetails, image: e.target.files[0] })}
                                />

                                {/* If user "updating an image" "that image is shown" else the image already in server is accessed and shown  */}
                                <img
                                    src={preview ? preview : `${SERVERURL}/uploads/${projects.picture}`}
                                    width={"300px"}
                                    className="text-light"
                                    alt=""
                                />
                            </label>

                            {isinvalidImageStatus && (
                                <p className="text-warning">*Upload only the following file type(jpeg,jpg,png)</p>
                            )}
                        </div>
                        <div className="col-6">
                            {/* Initially need to see the values user enterd when project details added  */}
                            {/* Also Provide The Input value Access to Update */}
                            <input
                                onChange={(e) => setprojectDetails({ ...projectDetails, title: e.target.value })}
                                value={projectDetails.title}
                                type="text"
                                className="form-control mb-3"
                                placeholder="Project Title"
                            />
                            <input
                                onChange={(e) => setprojectDetails({ ...projectDetails, lang: e.target.value })}
                                value={projectDetails.lang}
                                type="text"
                                className="form-control mb-3"
                                placeholder="Languages Used"
                            />
                            <input
                                onChange={(e) => setprojectDetails({ ...projectDetails, github: e.target.value })}
                                value={projectDetails.github}
                                type="text"
                                className="form-control mb-3"
                                placeholder="Project Github Link"
                            />
                            <input
                                onChange={(e) => setprojectDetails({ ...projectDetails, weblink: e.target.value })}
                                value={projectDetails.weblink}
                                type="text"
                                className="form-control mb-3"
                                placeholder="Project Website link"
                            />
                        </div>
                    </div>
                    <div>
                        {/* Initially need to see the values user enterd when project details added  */}
                        <input
                            onChange={(e) => setprojectDetails({ ...projectDetails, overview: e.target.value })}
                            value={projectDetails.overview}
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
                    <Button variant="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Edit;
