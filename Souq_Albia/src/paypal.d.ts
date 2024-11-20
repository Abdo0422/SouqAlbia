
interface PaypalButton {
  Buttons: (options: {
    createOrder: (data: any, actions: any) => Promise<string>;
    onApprove: (data: any, actions: any) => Promise<void>;
    onError: (err: any) => void;
  }) => {
    render: (selector: string) => void;
  };
}

interface Window {
  paypal: PaypalButton;
}
