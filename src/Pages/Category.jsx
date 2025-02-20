import React, { useState, useEffect } from 'react';

export default function Category() {
    const [Category, setCategory] = useState({ name: '' });
    const [allCategory, setAllCategory] = useState([]);
    const [id, setId] = useState(null);

    // Fetch categories on component mount
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/categories/')
            .then((response) => response.json())            
            .then((data) => setAllCategory(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    const submitData = (e) => {
        e.preventDefault();
    
        const categoryData = { 
            name: Category.name,
            slug: Category.name.toLowerCase().replace(/\s+/g, '-'),  // Generate slug from name
        };
    
        if (id !== null) {
            // Update category if id exists
            fetch(`http://127.0.0.1:8000/api/categories/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error updating category');
                    }
                    return response.json();
                })
                .then((updatedCategory) => {
                    const updatedCategories = allCategory.map((item) =>
                        item.id === id ? updatedCategory : item
                    );
                    setAllCategory(updatedCategories);
                    setId(null); // Reset id after update
                    setCategory({ name: '' }); // Reset input field
                })
                .catch((error) => {
                    console.error('Error updating category:', error);
                    alert('Failed to update category');
                });
        } else {
            // Add new category
            fetch('http://127.0.0.1:8000/api/categories/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            })
                .then((response) => response.json())
                .then((newCategory) => {
                    setAllCategory([...allCategory, newCategory]);
                    setCategory({ name: '' }); // Reset input
                })
                .catch((error) => {
                    console.error('Error adding category:', error);
                    alert('Failed to add category');
                });
        }
    };
    

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setCategory({ ...Category, [name]: value });
    };

    const handleDelete = (categoryId) => {
        fetch(`http://127.0.0.1:8000/api/categories/${categoryId}/`, {
            method: 'DELETE',
        })
            .then(() => {
                setAllCategory(allCategory.filter((cat) => cat.id !== categoryId));
            })
            .catch((error) => {
                console.error('Error deleting category:', error);
                alert('Failed to delete category');
            });
    };

    return (
        <div className='flex flex-col items-center justify-center gap-10 py-10 '>
            <form onSubmit={submitData}>
                <div className='flex flex-col gap-5 p-5 bg-white rounded'>
                    <input
                        className='px-2 py-2 border-b outline-0'
                        type='text'
                        name='name'
                        placeholder='Category'
                        onChange={handleChanges}
                        value={Category.name || ''}
                    />
                    <button type='submit' className='py-2 text-white bg-blue-600'>
                        {id !== null ? 'Update' : 'Add'}
                    </button>
                </div>
            </form>

            <div className=''>
                <table className=''>
                    <thead>
                        <tr>
                            <th className='px-5 py-2 text-center border'>Sr no.</th>
                            <th className='px-5 py-2 border'>Category</th>
                            <th className='px-5 py-2 border'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allCategory.map((item, index) => (
                            <tr key={item.id}>
                                <td className='px-5 py-2 text-center border'>{index + 1}</td>
                                <td className='px-5 py-2 border'>{item.name}</td>
                                <td className='px-5 py-2 border'>
                                    <button
                                        className='px-2 py-1 text-white bg-green-500'
                                        onClick={() => {
                                            setCategory(item);
                                            setId(item.id);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='px-2 py-1 ml-2 text-white bg-red-500'
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
