import React, {useEffect, useState} from "react";
import SidebarLayout from "../../../views/layouts/SidebarLayout";
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
import {postRequest} from "../../../library/api/fetcher-api/fetcher-middleware";
import {isSet} from "../../../library/utils";
import {setBreadcrumbsPageNameAction} from "../../../library/redux/actions/breadcrumbs-actions";
import ApiConfig from "../../../config/api-config";
import {setErrorAlertAction} from "../../../library/redux/actions/global-actions";

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

    useEffect(() => {
        setBreadcrumbsPageNameAction(ImporterPageName)
    }, []);

    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [selectedImportType, setSelectedImportType] = useState({});
    const [selectedImportFile, setSelectedImportFile] = useState({});
    const [mappingsData, setMappingsData] = useState({});
    const [response, setResponse] = useState({
        success: false,
        message: "",
        data: []
    });
    const availableTypesSelectList = {};

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
        {
            value: "properties",
            label: "Properties"
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

    const filterEntityList = (list) => {
        return list.map(item => {
            let name;
            Object.keys(item).map(key => {
                if (key.includes("name")) {
                    name = item[key];
                }
            })
            return {
                value: item?.id,
                name: name,
                label: name
            }
        })
    }

    const mappingsSelectChangeHandler = (destEntityKey, sourceEntityKey, importEntityName, sourceItemName, e) => {
        // console.log(destEntityKey, sourceEntityKey, importEntityName, e)
        setMappingsData(mappingsData => {
            let cloneData = {...mappingsData};
            if (!isSet(cloneData[importEntityName])) {
                cloneData[importEntityName] = {};
            }
            if (!isSet(cloneData[importEntityName][sourceEntityKey])) {
                cloneData[importEntityName][sourceEntityKey] = {};
            }
            if (!isSet(cloneData[importEntityName][sourceEntityKey][destEntityKey])) {
                cloneData[importEntityName][sourceEntityKey][destEntityKey] = {};
            }
            cloneData[importEntityName][sourceEntityKey][destEntityKey][sourceItemName] = e.value
            return cloneData;
        })
    }

    const getAvailableDestEntityOptions = (mappings) => {
        mappings.map((section, index) => {
            Object.keys(section.data).map(key => {
                availableTypesSelectList[key] = filterEntityList(section.data[key].available);
            })
        })
        return availableTypesSelectList;
    }

    const getMappingOptionsForSourceEntities = (sourceEntities, destEntityKey, importEntityName) => {
        return (
            <>
                <div className={"card"}>
                    <div className={"card-header"}>
                        <strong>{"Destination: " + destEntityKey}</strong>
                    </div>
                    <div className={"card-body"}>
                        {Object.keys(sourceEntities).map((sourceEntityKey, sourceEntityIndex) => (
                            <React.Fragment key={sourceEntityIndex}>
                                <h5>{"Source: " + sourceEntityKey}</h5>
                                {filterEntityList(sourceEntities[sourceEntityKey]).map((item, listIndex) => (
                                    <FormGroup as={Row} key={listIndex}>
                                        <FormLabel column sm="3">{item.name}</FormLabel>
                                        <Col sm="6">
                                            <Select
                                                options={availableTypesSelectList[destEntityKey]}
                                                onChange={
                                                    mappingsSelectChangeHandler.bind(
                                                        this,
                                                        destEntityKey,
                                                        sourceEntityKey,
                                                        importEntityName,
                                                        item.name
                                                    )
                                                }
                                            />
                                        </Col>
                                    </FormGroup>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </>
        )
    }

    const getMappingsForDestEntities = (destEntities, importEntityName) => {
        return (
            <>
                {Object.keys(destEntities).map((destEntityKey, index) => (
                    <React.Fragment key={index}>
                        {getMappingOptionsForSourceEntities(destEntities[destEntityKey].sources, destEntityKey, importEntityName)}
                    </React.Fragment>
                ))}
            </>
        );
    }

    const mappingStep = () => {
        if (!isSet(response.data) || !isSet(response.data.mappings) || !Array.isArray(response.data.mappings)) {
            return null;
        }
        getAvailableDestEntityOptions(response.data.mappings)
        return (
            <Form onSubmit={submitHandler}>
                {Array.isArray(response.data.mappings) && response.data.mappings.map((mappingEntityItem, index) => (
                    <React.Fragment key={index}>
                        <h3>{"Import: " + mappingEntityItem.import_entity.label}</h3>
                        {getMappingsForDestEntities(mappingEntityItem.data, mappingEntityItem.import_entity.name)}
                    </React.Fragment>
                ))}
                <FormGroup>
                    <Button type={"submit"}>
                        Run Import
                    </Button>
                </FormGroup>
            </Form>
        )
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

    const mappingStepSubmitHandler = (e) => {
        const extraData = {
            mappings: mappingsData,
            file_id: response.data.file.id,
            import_type: selectedImportType.value
        }
        postRequest({
            endpoint: ApiConfig.endpoints.tools,
            operation: "import/mappings",
            requestData: extraData,
            onSuccess: (responseData) => {
                if (responseData.status === "success") {
                    setActiveStep(2);
                    setResponse({
                        success: true,
                        message: responseData.message,
                        data: responseData.data
                    })
                    return true;
                }
                setActiveStep(1);
                setErrorAlertAction({
                    text: responseData?.message || "Error with mappings"
                })
                return false;
            },
            onError: (error) => {
                setErrorAlertAction({
                    text: error?.response?.data?.message || error?.response?.message || "Error with mappings"
                })
                setActiveStep(1);
            }
        })
    }
    const finishStepSubmitHandler = (e) => {
        setActiveStep(0)
    }

    const uploadStepSubmitHandler = (e) => {
        const data = new FormData();
        data.append("import_type", selectedImportType.value);
        data.append("upload_file", selectedImportFile);
        postRequest({
            endpoint: ApiConfig.endpoints.tools,
            operation: "import",
            requestData: data,
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onSuccess: (responseData) => {
                if (responseData.status === "success") {
                    setResponse({
                        success: true,
                        message: responseData.message,
                        data: responseData.data
                    })

                    if (!isSet(responseData.data.mappings)) {
                        setActiveStep(2);
                    } else {
                        setErrorAlertAction({
                            text: responseData?.message || "Error uploading import file"
                        })
                        setActiveStep(1);
                    }
                }
            },
            onError: (error) => {
                setErrorAlertAction({
                    text: error?.response?.data?.message || error?.response?.message || "Error with mappings"
                })
                setResponse({
                    success: false,
                    message: error?.response?.data?.message,
                    data: error?.response?.data?.data
                })
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

    return (
        <SidebarLayout pageName={ImporterPageName}>
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
        </SidebarLayout>
    )
}

export default ImporterPage;