class AdminFooter extends React.Component {

  constructor(props) {
    super(props)

  }

  componentDidMount() {
  }


  render() {
    return (
      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright &copy; Your Website 2019</span>
          </div>
        </div>
      </footer>
    )
  }
}
export default AdminFooter