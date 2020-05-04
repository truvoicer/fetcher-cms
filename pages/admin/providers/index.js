import AdminLayout from '../../../layouts/AdminLayout'
import DataTable from 'react-data-table-component';

export default class Provider extends React.Component {
    constructor(props) {
        super(props)
        this.props = props;
    }
    componentDidMount() {

        
    }

    getProviderData() {
        return [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];
    }
    tableColumns() {
        return [
            {
                name: 'Title',
                selector: 'title',
                sortable: true,
            },
            {
                name: 'Year',
                selector: 'year',
                sortable: true,
                right: true,
            },
        ];
    }
    render() {
        return (
            <AdminLayout>
                <>
                    <DataTable
                        title="Arnold Movies"
                        columns={this.tableColumns()}
                        data={this.getProviderData()}
                    />
                </>
            </AdminLayout>
        )
    }
}