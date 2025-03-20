import {
    AccountBookOutlined,
    BankOutlined,
    CalendarOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import {
    Clock,
    DollarSign,
    Globe,
    ShieldCheck,
    List,
    PlusCircle,
    Settings,
    Users,
    UserCheck,
    HandHeart,
    Headset,
    UsersRound,
    UserRound,
    BookOpen,
    FileCog,
    House,
    GitCompareArrows,
    Grid2x2Check,
  } from "lucide-react";
  import { Link } from "react-router-dom";
  
  const CustomItems = [
    {
      key: "1",
      icon:<UserRound size={20} />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    // {
    //   key: "2",
    //   icon:<UsersRound size={20}  />,
    //   label: "User Management",
    //   children: [
    //     {
    //       key: "permissions",
    //       label: (
           
    //           <p className="flex items-center gap-1 font-medium">
    //             <ShieldCheck size={20} /> Permissions
    //           </p>
            
    //       ),
    //     },
    //     {
    //       key: "roles",
    //       label: (
    //         <Link to="/dashboard/roles">
    //           <p className="flex items-center gap-1 font-medium">
    //             <Users size={20} /> Roles
    //           </p>
    //         </Link>
    //       ),
    //     },
    //     {
    //       key: "users",
    //       label: (
           
    //           <p className="flex items-center gap-1 font-medium">
    //             <UserCheck size={20} /> Users
    //           </p>
            
    //       ),
    //     },
    //   ],
    // },
    {
      key: "3",
      icon: <Globe size={20} />,
      label: <Link to="/dashboard/website">Website</Link>,
     
    },
    {
      key: "4",
      icon:  <FileCog size={20} />,
      label: <Link to="/dashboard/slider">Slider</Link>,
     
    },
    {
      key: "5",
      icon:  <House size={20} />,
      label: <Link to="/dashboard/home">Home</Link>,
     
    },
    {
      key: "6",
      icon:  <GitCompareArrows  size={20} />,
      label: <Link to="/dashboard/service">Service</Link>,
     
    },
    {
      key: "7",
      icon:  <Grid2x2Check  size={20} />,
      label: <Link to="/dashboard/category">Category</Link>,
     
    },
    
  ];
  
  export default CustomItems;
  