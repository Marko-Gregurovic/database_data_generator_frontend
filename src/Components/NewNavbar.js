import { AppBar } from "@material-ui/core";
import { Container, Navbar } from "react-bootstrap";

const NewNavbar = () => {
    return (

        // <Navbar className="navbar-transparent navbar-fixed-top navbar-color-on-scroll">
        //     <Container>
        //         <div class="navbar-header">
        //             <button id="menu-toggle" type="button" class="navbar-toggle">
        //                 <span class="sr-only">Toggle navigation</span>
        //                 <span class="icon-bar bar1"></span>
        //                 <span class="icon-bar bar2"></span>
        //                 <span class="icon-bar bar3"></span>
        //             </button>
        //             <a href="https://www.creative-tim.com">
        //                 <div class="logo-container">
        //                     <div class="logo">
        //                         <img src="assets/img/new_logo.png" alt="Creative Tim Logo" />
        //                     </div>
        //                     <div class="brand">Creative Tim</div>
        //                 </div>
        //             </a>
        //         </div>
        //         <div class="collapse navbar-collapse">
        //             <ul class="nav navbar-nav navbar-right">
        //                 <li>
        //                     <a
        //                         href="https://demos.creative-tim.com/material-dashboard-react/#/dashboard"
        //                     >Material Dashboard React</a
        //                     >
        //                 </li>
        //                 <li>
        //                     <a
        //                         href="https://github.com/creativetimofficial/material-dashboard-react/issues"
        //                     >Have an issue?</a
        //                     >
        //                 </li>
        //             </ul>
        //         </div>
        //     </Container>
        // </Navbar>

        <>
            <nav
                class="navbar navbar-transparent navbar-fixed-top navbar-color-on-scroll"
            >
                <div class="container">
        <div class="navbar-header">
                        <button id="menu-toggle" type="button" class="navbar-toggle">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar bar1"></span>
                            <span class="icon-bar bar2"></span>
                            <span class="icon-bar bar3"></span>
                        </button>
                        <a href="https://www.creative-tim.com">
                            <div class="logo-container">
                                <div class="logo">
                                    <img src="assets/img/new_logo.png" alt="Creative Tim Logo" />
                                </div>
                                <div class="brand">Creative Tim</div>
                            </div>
                        </a>
                    </div>
        <div class="collapse navbar-collapse">
                        <ul class="nav navbar-nav navbar-right">
                            <li>
                                <a
                                    href="https://demos.creative-tim.com/material-dashboard-react/#/dashboard"
                                >Material Dashboard React</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://github.com/creativetimofficial/material-dashboard-react/issues"
                                >Have an issue?</a
                                >
                            </li>
                        </ul>
                    </div>
      </div>
    </nav>
            <div
                class="page-header header-filter"
                style="background-image: url('assets/img/cover.jpeg');"
            >
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2 text-center">
                            <h1 class="title ">Material Dashboard React</h1>
                            <h4 class="title">Tutorial and Components</h4>
                            <h5 class="description">v1.9.0</h5>
                            <a
                                href="https://demos.creative-tim.com/material-dashboard-react/#/documentation/tutorial"
                                class="btn btn-rose btn-fill btn-round"
                                target="_blank"
                            >View documentation</a
                            >
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer footer-transparent">
                <div class="container">
                    <nav class="pull-left">
                        <ul>
                            <li><a href="https://www.creative-tim.com"> Creative Tim </a></li>
                            <li>
                                <a href="https://presentation.creative-tim.com"> About Us </a>
                            </li>
                            <li><a href="http://blog.creative-tim.com"> Blog </a></li>
                            <li>
                                <a href="https://www.creative-tim.com/license"> Licenses </a>
                            </li>
                        </ul>
                    </nav>
                    <div class="social-area pull-right">
                        <a
                            class="btn btn-just-icon btn-twitter btn-simple"
                            href="https://twitter.com/CreativeTim"
                        >
                            <i class="fa fa-twitter"></i>
                        </a>
                        <a
                            class="btn btn-just-icon btn-facebook btn-simple"
                            href="https://www.facebook.com/CreativeTim"
                        >
                            <i class="fa fa-facebook-square"></i>
                        </a>
                        <a
                            class="btn btn-just-icon btn-google btn-simple"
                            href="https://plus.google.com/+CreativetimPage"
                        >
                            <i class="fa fa-google-plus"></i>
                        </a>
                        <a
                            class="btn btn-just-icon btn-instagram btn-simple"
                            href="https://www.instagram.com/creativetimofficial"
                        >
                            <i class="fa fa-instagram"></i>
                        </a>
                    </div>
                    <div class="copyright">
                        &copy;
          <script>
                            document.write(new Date().getFullYear());
          </script>
          Creative Tim, made with love
        </div>
                </div>
            </footer>
        </>
    );
};

export default NewNavbar;