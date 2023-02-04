import { Button, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Billing.module.css";
import axios from "axios";
import { useEffect } from "react";
// import { Box } from "@chakra-ui/react";

const Billing = () => {
  const navigate = useNavigate();

  const { total } = useSelector((store) => store.CartReducer);

  const { buyCurrentItem } = useSelector((store) => store.AuthReducer);

  const [final, setFinal] = useState(
    buyCurrentItem === 0 ? total : buyCurrentItem
  );

  const [promo, setPromo] = useState("");

  if (total === 0 && buyCurrentItem === 0) {
    navigate("/cart");
  }

  const [form, setForm] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlePromo = () => {
    if (promo === "LOVODA5") {
      setFinal((prev) => prev - 5);
      setOrderAmount((prev) => prev - 5);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  const toast = useToast();

  const setToast = (title, desc, status) => {
    toast({
      title: title,
      description: desc,
      status: status,
      duration: 2000,
      isClosable: true,
    });
  };

  // ---------------Razorpay Geteway
  const [loading, setLoading] = useState(false);
  const [orderAmount, setOrderAmount] = useState(total);
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    const { data } = await axios.get(
      "https://lovoda-clone-eta.vercel.app/razorpay/list-orders"
    );
    setOrders(data);
  }
  useEffect(() => {
    fetchOrders();
  }, []);

  function loadRazorpay() {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.address ||
      !form.phone ||
      !form.city
    ) {
      console.log(form, "fdskl");
      setToast("Please enter credentials", "", "warning");
    } else {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onerror = () => {
        alert("Razorpay SDK failed to load. Are you online?");
      };
      script.onload = async () => {
        try {
          setLoading(true);
          const result = await axios.post(
            "https://lovoda-clone-eta.vercel.app/razorpay/create-order",
            {
              amount: orderAmount + "00",
            }
          );
          const { amount, id: order_id, currency } = result.data;
          const {
            data: { key: razorpayKey },
          } = await axios.get(
            "https://lovoda-clone-eta.vercel.app/razorpay/get-razorpay-key"
          );

          const options = {
            key: razorpayKey,
            amount: amount.toString(),
            currency: currency,
            name: "example name",
            description: "example transaction",
            order_id: order_id,
            handler: async function (response) {
              const result = await axios.post(
                "https://lovoda-clone-eta.vercel.app/razorpay/pay-order",
                {
                  amount: amount,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
                }
              );
              navigate("/ordercomplete");
              // alert(result.data.msg);
              fetchOrders();
            },
            prefill: {
              name: "example name",
              email: "email@example.com",
              contact: "111111",
            },
            notes: {
              address: "example address",
            },
            theme: {
              color: "#80c0f0",
            },
          };

          setLoading(false);
          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        } catch (err) {
          alert(err);
          setLoading(false);
        }
      };
      document.body.appendChild(script);
    }
  }

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.leftBox}>
            <img
              className={styles.logo}
              src="https://cdn.shopify.com/s/files/1/0627/7388/7215/files/04122019_logo2_90x.png?v=1645644264"
              alt=""
            />
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              <div>Contact information</div>
            </div>
            <div className={styles.user}>
              <img
                alt=""
                src="/styles/2e4f569041603c0f96369e2d978b6757.png"
                className="dummyImg"
              />
              <div className="userEmail">
                {/* <p>UserName(manWithNoName@gmail.com)</p> */}
                {/* <div style={{ display: "flex", justifyContent: "left" }}>
                  <a href="">Log out</a>
                </div> */}
              </div>
            </div>
            <div className="news">
              <span>
                <i className="fa-solid fa-square-check"></i>
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                marginTop: "10px",
                marginBottom: "10px",
                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              <div>Shipping Address</div>
            </div>
            <h3></h3>
            <form onSubmit={handleSubmit}>
              <select name="country" className={styles.country}>
                <option name="country" value="">
                  Country/region
                </option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="Japan">Japan</option>
                <option value="Canada">Canada</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
                <option value="Bulgaria">Bulgaria</option>
              </select>
              <div>
                <input
                  onChange={handleChange}
                  className={styles.first_name}
                  type="text"
                  name="firstName"
                  placeholder="First name"
                />
                <input
                  onChange={handleChange}
                  className={styles.last_name}
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                />
              </div>
              <input
                onChange={handleChange}
                className={styles.com}
                type="text"
                name="companyName"
                placeholder="Company (optional)"
              />
              <br />
              <input
                onChange={handleChange}
                className={styles.addr}
                type="text"
                name="address"
                placeholder="Address"
              />
              <br />
              <input
                onChange={handleChange}
                className={styles.flat}
                type="text"
                name="addressLine1"
                placeholder="Apartment, suite, etc. (optional)"
              />
              <br />
              <input
                onChange={handleChange}
                className={styles.city}
                type="text"
                name="city"
                placeholder="City"
              />
              <select
                name="state"
                onChange={handleChange}
                className={styles.state}
              >
                <option value="">State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Andaman and Nicobar Islands">
                  Andaman and Nicobar Islands
                </option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Dadar and Nagar Haveli">
                  Dadar and Nagar Haveli
                </option>
                <option value="Daman and Diu">Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
              <input
                onChange={handleChange}
                className={styles.pin}
                type="number"
                name="pin"
                placeholder="PIN code"
              />
              <br />
              <input
                onChange={handleChange}
                className={styles.phone}
                type="number"
                name="phone"
                placeholder="Phone"
              />

              <div className={styles.cartORpay}>
                <button onClick={() => navigate("/cart")}>Return to Bag</button>
                <input
                  type="submit"
                  value="Complete Order"
                  onClick={loadRazorpay}
                  className={styles.submit}
                />
              </div>
            </form>

            <div className={styles.rights}>
              <p>All rights reserved Koovs</p>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightBox}>
            <h2>Promo Code</h2>
            <div className={styles.discount}>
              <input
                onChange={(e) => setPromo(e.target.value)}
                className={styles.code}
                type="text"
                placeholder="Gift card or discount code"
              />
              <input
                type="submit"
                value="Apply"
                onClick={handlePromo}
                className={styles.submit}
              />
              <Text textAlign={"left"} mt={2}>
                Available Promocodes: LOVODA5 (for 5$ off)
              </Text>
            </div>
            <div className={styles.total}>
              <p>Total - ${final}</p>
              <h2 className={styles.showTotal}></h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
