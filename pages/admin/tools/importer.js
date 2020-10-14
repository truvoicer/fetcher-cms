import React, {useEffect, useState} from "react";
import Admin from "../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import {Button, FormGroup, FormLabel} from "react-bootstrap";
import Select from "react-select";
import FormFileInput from "react-bootstrap/FormFileInput";
import {fetchData, sendFileData} from "../../../library/api/middleware";
import {isSet} from "../../../library/utils";

const sprintf = require("sprintf-js").sprintf

export const ImporterPageName = "importer";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const ImporterPage = (props) => {

    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [selectedImportType, setSelectedImportType] = useState({});
    const [selectedImportFile, setSelectedImportFile] = useState({});
    const [availableTypesList, setAvailableTypesList] = useState({});
    const [response, setResponse] = useState({
        success: false,
        message: "",
        data: []
    });

    const getBreadcrumbsConfig = () => {
        return {
            pageName: ImporterPageName,
        }
    }

    const steps = [
        {
            name: "upload_step",
            label: "Upload File"
        },
        {
            name: "mapping_step",
            label: "Select Mappings"
        },
        {
            name: "finish_step",
            label: "Finish"
        }
    ];
    const importTypes = [
        {
            value: "categories",
            label: "Categories"
        },
        {
            value: "services",
            label: "Services"
        },
        {
            value: "providers",
            label: "Providers"
        },
    ]

    const getStepContent = (key) => {
        switch (key) {
            case 0:
                return uploadStep();
            case 1:
                return mappingStep();
            case 2:
                return finishStep();
            default:
                return null;
        }
    }

    const uploadStep = () => {
        return (
            <>
                <Form onSubmit={submitHandler}>
                    <FormGroup>
                        <FormLabel>
                            Select import type
                        </FormLabel>
                        <Select
                            id={"importTypeSelect"}
                            values={selectedImportType}
                            options={importTypes}
                            onChange={importTypesChangeHandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.File
                            id="importFile"
                            label="Select import file (xml)"
                            onChange={fileChangeHandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button type={"submit"}>
                            Run Import
                        </Button>
                    </FormGroup>
                </Form>
            </>
        )
    }
    const uploadStepSubmitHandler = (e) => {
        const data = new FormData();
        data.append("import_type", selectedImportType.value);
        data.append("upload_file", selectedImportFile);
        sendFileData("tools", "import", data)
            .then(response => {
                if (response.data.status === "success") {
                    console.log(response.data)
                    setResponse({
                        success: true,
                        message: response.data.message,
                        data: response.data.data
                    })
                    console.log(response.data.data)
                    const successItems = response.data.data.filter(item => item.status === "success");
                    console.log(successItems)
                    if (successItems.length === 0) {
                        setActiveStep(2);
                    } else {
                        setActiveStep(1);
                    }
                }
                console.log(response.data)
            })
            .catch(error => {
                setResponse({
                    success: false,
                    message: error?.response?.data?.message,
                    data: error?.response?.data?.data
                })
            })
    }

    const getMappingsSection = (section) => {
        setAvailableTypesList(availableTypesList => {
            let cloneList = [...availableTypesList];
            if (isSet(section.name)) {
                cloneList[section.name] = section.available;
            }
            return cloneList;
        })
        return (
            <>

            </>
        );
    }

    const mappingStep = () => {
        return (
            <>
                {Array.isArray(response.data) && response.data.map((item, index) => (
                    <React.Fragment key={index}>
                        {getMappingsSection(item)}
                    </React.Fragment>
                ))}
            </>
        )
    }
    const mappingStepSubmitHandler = () => {

    }
    const finishStep = () => {
        return (
            <>
                {Array.isArray(response.data) && response.data.map((item, index) => (
                    <React.Fragment key={index}>
                        <div>
                            <p>
                                {item.message}
                            </p>
                        </div>
                    </React.Fragment>
                ))}

                <Form onSubmit={submitHandler}>
                    <FormGroup>
                        <Button type={"submit"}>
                            Start Again
                        </Button>
                    </FormGroup>
                </Form>
            </>
        )
    }
    const finishStepSubmitHandler = (e) => {
        setActiveStep(0)
    }

    const fileChangeHandler = (e) => {
        setSelectedImportFile(selectedImportFile => {
            return e.target.files[0];
        })
    }
    const importTypesChangeHandler = (e) => {
        setSelectedImportType(selectedImportType => {
            return {
                value: e.value,
                label: e.label
            }
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        switch (activeStep) {
            case 0:
                uploadStepSubmitHandler(e);
                break
            case 1:
                mappingStepSubmitHandler(e);
                break
            case 2:
                finishStepSubmitHandler(e);
                break
            default:
                console.error("Invalid submit")
        }
        return false;
    }

    useEffect(() => {

    }, []);

    return (
        <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={ImporterPageName}>
            <Row>
                <Col sm={12} md={12} lg={12}>
                    <Card>
                        <Card.Header>Importer</Card.Header>
                        <Card.Body>
                            <div className={classes.root}>
                                <Stepper activeStep={activeStep} alternativeLabel>
                                    {steps.map((step, index) => (
                                        <Step key={index}>
                                            <StepLabel>{step.label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>

                                <Row className={"justify-content-center"}>
                                    <Col sm={12} md={9}>
                                        <Card>
                                            <Card.Header>{steps[activeStep].label}</Card.Header>
                                            <Card.Body>
                                                {getStepContent(activeStep)}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Admin>
    )
}

export default ImporterPage;