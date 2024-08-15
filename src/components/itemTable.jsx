import React from "react";
import { useNavigate } from "react-router";

const ItemsList = ({items, deleteItem}) => {

    const navigate = useNavigate();

    return(

    <div style={{ margin: '20px', width: "50%" }} >
            <div >

                <h2 style={{ textAlign: 'center' }}>Inventory Items</h2>
                <button onClick={() => navigate(-1)} style={{ backgroundColor: '#4A235A', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}>
                      Back
                </button>
                <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 auto' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Item Name</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Item Type</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Quantity</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    Array.isArray(items) && items.length > 0 ? (
                    items.map((item, index) => (
                        <tr key={index}>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                {item.itemName}
                            </td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                {item.itemType}
                            </td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                {item.quantity}
                            </td>
                            <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                                    <button
                                        style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}
                                        onClick={() => deleteItem(item.id)}>
                                        Delete
                                    </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" style={{ textAlign: 'center', padding: '12px' }}>
                            No items to display
                        </td>
                    </tr>
                    )}
                    </tbody>
                </table>
            </div>
        
    </div>
);
}

export default ItemsList