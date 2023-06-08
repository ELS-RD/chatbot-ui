import { IconX } from '@tabler/icons-react';
import toast, { Toast } from 'react-hot-toast';


type CustomToastProps = {
  t: Toast;
  message: string;
  backgroundColor: string;
};
const CustomToast = ({ t, message, backgroundColor }: CustomToastProps) => {
  return (
    <div
      className={`relative inline-flex items-start md:w-1/3 pt-4 pr-8 pb-4 pl-4 rounded-lg ${backgroundColor} text-white opacity-90 shadow-md`}
    >
      <span className="mr-2.5">{t.icon}</span>
      <div>
        <p>{message}</p>
      </div>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="absolute top-1 right-1"
      >
        <IconX />
      </button>
    </div>
  );
};

export default CustomToast;