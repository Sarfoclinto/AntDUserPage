import { useState, useEffect } from "react";
import { Table, Space, Form, Input, Modal, Button, Tooltip } from "antd";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";
import FormItem from "antd/es/form/FormItem";
function App() {
  const [form] = Form.useForm();
  const [alldata, setAllData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [mapData, setMapData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [user, setUser] = useState([]);

  const [edit, setEdit] = useState({
    name: "",
    email: "",
    addressStreet: "",
    addressCity: "",
    phone: "",
    website: "",
    companyName: "",
    companyCatchphrase: "",
  });

  // //////////////////////////////////////////////////////////////////////////
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [add, setAdd] = useState({
    name: "",
    email: "",
    addressStreet: "",
    addressCity: "",
    phone: "",
    website: "",
    companyName: "",
    companyCatchphrase: "",
  });
  // //////////////////////////////////////////////////////////////////////////

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////
  /* open modal and edit modal*/
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showEdit = () => {
    setEdit(true);
  };

  const showAdd = () => {
    setAddModalOpen(true);
  };
  /* open modal and edit modal*/

  /* handle oks*/
  const handleOk = (user) => {
    setMapData((prev) => {
      return prev.filter((data) => {
        return data.name !== user.name;
      });
    });
    setIsModalOpen(false);
  };

  const detailsChange = (name) => {
    setMapData((prev) => {
      return prev.map((data) => {
        return data.name === name ? edit : data;
      });
    });
    setEditOpen(false);
  };

  const addUser = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(add),
        }
      );
      if (!response.ok) {
        throw new Error("Sending Failed");
      }
      const newUserData = await response.json();
      setMapData((prev) => [...prev, newUserData]);
      setAdd({
        name: "",
        email: "",
        addressStreet: "",
        addressCity: "",
        phone: "",
        website: "",
        companyName: "",
        companyCatchphrase: "",
      });
      setAddModalOpen(false);
    } catch (error) {
      console.log(error);
      setAddModalOpen(false);
    }
  };
  /* handle oks*/

  /* handle cancel */
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleEditCancel = () => {
    setEditOpen(false);
  };
  /* handle cancel */
  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Sorry!!!, Response not found");
        }
        setLoading(false);
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setAllData(data);
      })
      .catch((err) => {
        setError(err.message);
        console.log(error);
      });
  }, []);

  // const handle changes
  const handleChange = (e) => {
    const { value, name } = e.target;
    setEdit((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddChange = (e) => {
    const { value, name } = e.target;
    setAdd((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  // const handle changes

  console.log(alldata);
  const formattedData = alldata?.map((data) => {
    return {
      name: data.name,
      email: data.email,
      addressStreet: data.address.street,
      addressCity: data.address.city,
      phone: data.phone,
      website: data.website,
      companyName: data.company.companyName,
      companyCatchphrase: data.company.companyCatchphrase,
    };
  });
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          borderBottom: "1px solid lightgray",
        }}
      >
        <h1>User Management Page</h1>{" "}
        <Tooltip title="Add User">
          <span>
            <div
              style={{
                fontSize: "20px",
                padding: "5px",
                backgroundColor: "black",
                color: "white",
                borderRadius: "50%",
                height: "30px",
                width: "30px",
              }}
            >
              <i
                className="fa-solid fa-plus"
                onClick={() => {
                  setAddModalOpen(true);
                }}
              ></i>
            </div>
          </span>
        </Tooltip>
      </div>
      <>
        <>
          <Modal
            title="Add User"
            open={addModalOpen}
            onOk={() => {
              console.log(add);
              addUser();
            }}
            onCancel={() => {
              setAddModalOpen(false);
            }}
          >
            <Form>
              <FormItem
                label="Name"
                key="addname"
                rules={[
                  {
                    min: 8,
                    required: true,
                  },
                ]}
              >
                <Input
                  value={add.name}
                  onChange={handleAddChange}
                  name="name"
                  allowClear
                />
              </FormItem>
              <FormItem
                label="Email"
                key="addemail"
                rules={[
                  {
                    type: "email",
                    required: true,
                  },
                ]}
              >
                <Input
                  name="email"
                  onChange={handleAddChange}
                  value={add.email}
                  allowClear
                />
              </FormItem>
            </Form>

            <FormItem
              label="Address(Street)"
              key="addaddressStreet"
              rules={[{ required: true }]}
            >
              <Input
                value={add.addressStreet}
                name="addressStreet"
                onChange={handleAddChange}
                allowClear
              />
            </FormItem>

            <FormItem
              label="Address(City)"
              key="addaddressCity"
              rules={[{ required: true }]}
            >
              <Input
                value={add.addressCity}
                name="addressCity"
                onChange={handleAddChange}
                allowClear
              />
            </FormItem>

            <FormItem
              label="Phone"
              key="addphone"
              rules={[{ type: "number", required: true }]}
            >
              <Input
                name="phone"
                value={add.phone}
                onChange={handleAddChange}
                allowClear
              />
            </FormItem>
            <FormItem
              label="Website"
              key="addwebsite"
              rules={[{ type: "url", required: true }]}
            >
              <Input
                name="website"
                value={add.website}
                onChange={handleAddChange}
                allowClear
              />
            </FormItem>
            <FormItem
              label="Company Name"
              key="addcompanyName"
              rules={[{ required: true }]}
            >
              <Input
                name="companyName"
                value={add.companyName}
                onChange={handleAddChange}
                allowClear
              />
            </FormItem>
            <FormItem
              label="Company Catchphrase"
              key="addcompanyCatchphrase"
              rules={[{ type: "number" }]}
            >
              <Input
                name="companyCatchphrase"
                value={add.companyCatchphrase}
                onChange={handleAddChange}
                allowClear
              />
            </FormItem>
          </Modal>
        </>
      </>
      <>
        <Table
          dataSource={formattedData}
          bordered
          size="large"
          loading={loading}
        >
          <Column title="Name" key="name" dataIndex="name" />
          <Column title="Email" key="email" dataIndex="email" />
          <ColumnGroup title="Address">
            <Column title="Street" key="street" dataIndex="addressStreet" />
            <Column title="City" key="city" dataIndex="addressCity" />
          </ColumnGroup>
          <Column title="Phone" key="phone" dataIndex="phone" />
          <Column title="Website" key="website" dataIndex="website" />
          <ColumnGroup title="Company">
            <Column title="Name" key="companyName" dataIndex="companyName" />
            <Column
              title="CatchPhrase"
              key="companyCatchphrase"
              dataIndex="companyCatchphrase"
            />
          </ColumnGroup>
          <Column
            title="Action"
            key="action"
            dataIndex="action"
            render={(_, record) => (
              <Space size="middle">
                <i
                  className="fa-solid fa-pen-to-square"
                  onClick={() => {
                    setEditOpen(true);
                    setEdit({
                      name: record.name,
                      email: record.email,
                      addressStreet: record.addressStreet,
                      addressCity: record.addressCity,
                      phone: record.phone,
                      website: record.website,
                      companyName: record.companyName,
                      companyCatchphrase: record.companyCatchphrase,
                    });
                    setUser(record);
                  }}
                ></i>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => {
                    setUser(record);
                    showModal();
                  }}
                ></i>
              </Space>
            )}
          />
        </Table>
      </>
      {/* prompt modal */}
      <>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={() => {
            handleOk(user);
          }}
          onCancel={handleCancel}
        >
          <p
            style={{
              fontSize: "17px",
              fontWeight: "bold",
            }}
          >
            Are you sure you want to delete {user?.name} ?
          </p>
        </Modal>
      </>
      {/* prompt modal */}
      {/* edit modal  */}
      <>
        <Modal
          title="Edit Details"
          open={editOpen}
          onOk={() => {
            detailsChange(user.name);
          }}
          onCancel={() => setEditOpen(false)}
        >
          <Form>
            <FormItem
              label="Name"
              key="name"
              rules={[
                {
                  min: 8,
                  required: true,
                },
              ]}
            >
              <Input value={edit.name} onChange={handleChange} name="name" />
            </FormItem>
            <FormItem
              label="Email"
              key="email"
              rules={[
                {
                  type: "email",
                  required: true,
                },
              ]}
            >
              <Input name="email" onChange={handleChange} value={edit.email} />
            </FormItem>
          </Form>

          <FormItem
            label="Address(Street)"
            key="addressStreet"
            rules={[{ required: true }]}
          >
            <Input
              value={edit.addressStreet}
              name="addressStreet"
              onChange={handleChange}
            />
          </FormItem>

          <FormItem
            label="Address(City)"
            key="addressCity"
            rules={[{ required: true }]}
          >
            <Input
              value={edit.addressCity}
              name="addressCity"
              onChange={handleChange}
            />
          </FormItem>

          <FormItem
            label="Phone"
            key="phone"
            rules={[{ type: "enum", required: true }]}
          >
            <Input name="phone" value={edit.phone} onChange={handleChange} />
          </FormItem>
          <FormItem
            label="Website"
            key="website"
            rules={[{ type: "url", required: true }]}
          >
            <Input
              name="webiste"
              value={edit.website}
              onChange={handleChange}
            />
          </FormItem>
          <FormItem
            label="Company Name"
            key="companyName"
            rules={[{ required: true }]}
          >
            <Input
              name="companyName"
              value={edit.companyName}
              onChange={handleChange}
            />
          </FormItem>
          <FormItem
            label="Company Catchphrase"
            key="companyCatchphrase"
            rules={[{ type: "number" }]}
          >
            <Input
              name="companyCatchphrase"
              value={edit.companyCatchphrase}
              onChange={handleChange}
            />
          </FormItem>
        </Modal>
      </>
      {/* edit modal  */}
    </>
  );
}

export default App;
