import React, {useEffect} from "react";
import ApiConfig from "../../../../config/api-config";
import DeleteForm from "../../../../views/components/Forms/DeleteForm";
import DataList from "../../../../views/components/Tables/DataList";
import SidebarLayout from "../../../../views/layouts/SidebarLayout";
import Col from "react-bootstrap/Col";
import {fetchRequest} from "../../../../library/api/fetcher-api/fetcher-middleware";
import {setBreadcrumbsPageNameAction} from "../../../../library/redux/actions/breadcrumbs-actions";

export const FileSystemPageName = "filesystem";

const FileSystemPage = (props) => {

    useEffect(() => {
        setBreadcrumbsPageNameAction(FileSystemPageName)
    }, []);

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
        fetchRequest({
            endpoint: sprintf(ApiConfig.endpoints.fileDownload, data.id),
            onSuccess: (responseData) => {
                window.open(responseData.data.url, "_blank")
                return true;
            }
        })
    }

    const getTableDropdownControls = () => {
        return [
            {
                control: "button",
                text: "Download",
                action: downloadCallback,
                size: "md",
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
                size: "md",
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
        <SidebarLayout pageName={FileSystemPageName}>
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
        </SidebarLayout>
    )
}


export default FileSystemPage