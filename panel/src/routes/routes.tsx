import DashboardAdmin from "../pages/admin/Dashboard/Dashboard";
import HomePageAdmin from "../pages/admin/HomePage/HomePage";
import LoginAdmin from "../pages/admin/Login/Login";
import ChatCompany from "../pages/company/Chat/Chat";
import ChatBox from "../pages/company/Chat/ChatBox";
import DashboardCompany from "../pages/company/Dashboard/Dashboard";
import EmploymentCompany from "../pages/company/Employment/Employment";
import GetEmploymentCompany from "../pages/company/GetEmployment/GetEmployment";
import HomePageCompany from "../pages/company/HomePage/HomePage";
import LoginCompany from "../pages/company/Login/Login";
import PaymentCompany from "../pages/company/Payment/Payment";
import ProfileCompany from "../pages/company/Profile/Profile";
import RatesCompany from "../pages/company/Rates/Rates";
import SingleEmployment from "../pages/company/SingleEmployment/SingleEmployment";
import SuggestExpertCompany from "../pages/company/SuggestExpert/SuggestExpert";
import ChatExpert from "../pages/expert/Chat/Chat";
import ChatBoxExpert from "../pages/expert/Chat/ChatBox";

import DashboardUser from "../pages/expert/Dashboard/Dashboard";
import HomePageUser from "../pages/expert/HomePage/HomePage";
import LoginUser from "../pages/expert/Login/Login";
import PaymentExpert from "../pages/expert/Payment/Payment";
import ProfileUser from "../pages/expert/Profile/Profile";
import RatesUser from "../pages/expert/Rates/Rates";
import SuggestCompanyUser from "../pages/expert/SuggestCompany/SuggestCompany";
export default [
    { path: "/admin/login", element: <LoginAdmin /> },
    {
        path: "/admin",
        element: <HomePageAdmin />,
        children: [
            { path: "dashboard", element: <DashboardAdmin /> },
        ],
    },
    { path: "/company/login", element: <LoginCompany /> },
    {
        path: "/company",
        element: <HomePageCompany />,
        children: [
            { path: "dashboard", element: <DashboardCompany /> },
            { path: "profile", element: <ProfileCompany /> },
            { path: "employment", element: <EmploymentCompany /> },
            { path: "suggestExpert", element: <SuggestExpertCompany /> },
            {
                path: "chat", element: <ChatCompany />, children: [
                    { path: ":id", element: <ChatBox /> },
                ]
            },
            { path: "rates", element: <RatesCompany /> },
            { path: "get-employment", element: <GetEmploymentCompany /> },
            { path: "employment/:id", element: <SingleEmployment /> },
            { path: "payment", element: <PaymentCompany /> }
        ],
    },
    { path: "/expert/login", element: <LoginUser /> },
    {
        path: "/expert",
        element: <HomePageUser />,
        children: [
            { path: "dashboard", element: <DashboardUser /> },
            {
                path: "chat", element: <ChatExpert />, children: [
                    { path: ":id", element: <ChatBoxExpert /> },
                ]
            },
            { path: "profile", element: <ProfileUser /> },
            { path: "rates", element: <RatesUser /> },
            { path: "suggest", element: <SuggestCompanyUser /> },
            { path: "payment", element: <PaymentExpert /> },
        ],
    },
    // { path: "/*", element: <NotFound /> },
];