// component
import Iconify from "../NavSection/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "Dummy",
    path: "/Home",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
];

export default sidebarConfig;
