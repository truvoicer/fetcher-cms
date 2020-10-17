import React from "react";
import ApiConfig from "../../../../config/api-config";
import DeleteForm from "../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../views/components/Tables/DataList";
import Admin from "../../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";
import {fetchData} from "../../../../library/api/middleware";

export const FileSystemPageName = "filesystem";

const FileSystemPage = (props) => {

    const getBreadcrumbsConfig = () => {
        return {
            pageName: FileSystemPageName,
        }
    }
    const getTableData = () => {
        return {
            title: "",
            endpoint: ApiConfig.endpoints.fileList,
            defaultColumnName: "filename",
            query: {
                count: 1000,
                order: "asc",
                sort: "filename"
            },
        };
    }

    const getTableColumns = () => {
        return [
            {
                name: 'Filename',
                selector: 'filename',
                grow: 1,
                sortable: true,
                editable: false,
            },
            {
                name: 'Path',
                selector: 'path',
                grow: 1,
                sortable: true,
                editable: false,
            },
            {
                name: 'FileSystem',
                selector: 'file_system',
                grow: 1,
                sortable: true,
                editable: false,
            },
            {
                name: 'File Type',
                selector: 'file_type',
                grow: 0,
                sortable: true,
                editable: false,
            },
            {
                name: 'File Size',
                selector: 'file_size',
                grow: 0,
                sortable: true,
                editable: false,
            },
            {
                name: 'Ext',
                selector: 'extension',
                grow: 0,
                sortable: true,
                editable: false,
            },
        ];
    }

    const downloadCallback = (data, e) => {
        fetchData(sprintf(ApiConfig.endpoints.fileDownload, data.id))
            .then(response => {
                if (response.data.status === "success") {
                    window.open(response.data.data.url, "_blank")
                    return true;
                }
                console.error(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const getTableDropdownControls = () => {
        return [
            {
                control: "button",
                text: "Download",
                action: downloadCallback,
                size: "sm",
                classes: "outline-success"
            },
            {
                control: "button",
                text: "Delete",
                action: "delete",
                modal: {
                    showModal: true,
                    modalTitle: "Delete File",
                    endpoint: "tools/filesystem/file",
                    modalFormName: "delete"
                },
                size: "sm",
                classes: "outline-danger"
            }
        ];
    }
    const getModalConfig = () => {
        return {
            delete: {
                modalForm: DeleteForm
            }
        };
    }

    return (
        <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={FileSystemPageName}>
            <>
                <Col sm={12} md={12} lg={12}>
                    <DataList
                        tableData={getTableData()}
                        tableColumns={getTableColumns()}
                        tableDropdownControls={getTableDropdownControls()}
                        modalConfig={getModalConfig()}
                    />
                </Col>
            </>
        </Admin>
    )
}


export default FileSystemPage