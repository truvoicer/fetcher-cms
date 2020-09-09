import React from "react";
import Head from "next/head";
import Link from "next/link";

const Index = (props) => {
    return (
        <>
            <Head>
                <title>Fetcher CMS</title>
            </Head>
            <div className="c-app flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="clearfix">
                                <h1 className="display-1">FETCHER CMS</h1>
                                <h4 className="text-muted">Go to &nbsp;
                                <Link
                                    href={"/admin/dashboard"}
                                    as={"/admin/dashboard"}
                                >
                                    <a>Admin Dashboard</a>
                                </Link>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Index;