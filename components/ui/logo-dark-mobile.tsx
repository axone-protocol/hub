type LogoDarkMobileProps = React.SVGProps<SVGSVGElement> & {
  // You can add other props here if needed
}

const LogoDarkMobile = ({ ...props }: LogoDarkMobileProps) => (
  <svg width='30' height='30' viewBox='0 0 30 30' fill='none' {...props} xmlns='http://www.w3.org/2000/svg'>
    <path d='M10.8424 14.8906L18.9218 23.0909L27.0919 15.0114L19.0125 6.81115L10.8424 14.8906ZM18.8916 25.9734L7.92969 14.8604L16.275 6.62986L19.0366 3.89844L29.9986 15.0356L18.8856 25.9673L18.8916 25.9734Z' fill='white'/>
    <path d='M19.0679 19.2698L17.6297 17.7954L20.3611 15.0942L17.5391 12.2177L18.9833 10.7734L23.2738 15.1244L19.0679 19.2698Z' fill='#FF9500'/>
    <path d='M10.9921 26.0991L0 14.9619L11.113 4L13.6933 6.6166L12.2249 8.05483L11.113 6.90666L2.91271 14.9921L10.9921 23.1924L12.0497 22.1591L13.4879 23.6336L10.9921 26.0991Z' fill='white'/>
  </svg>

);

export default LogoDarkMobile;