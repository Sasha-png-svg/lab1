import React, { useState } from 'react';
import { Catalog } from './services/Catalog';
import { Product } from './models/Product';
import './App.css';

const catalog = new Catalog();

// Початкові товари
catalog.addProduct("Ноутбук Lenovo", 25000, "Електроніка");
catalog.addProduct("Навушники Sony", 3500, "Електроніка");
catalog.addProduct("Футболка Nike", 890, "Одяг");
catalog.addProduct("Кросівки Adidas", 3200, "Взуття");

function App() {
  const [products, setProducts] = useState<Product[]>(catalog.getAll());
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  // Оновити список
  const updateList = () => {
    setProducts([...catalog.getAll()]);
  };

  // Додати товар
  const handleAdd = () => {
    if (!name || !price || !category) {
      alert("Заповніть всі поля!");
      return;
    }

    catalog.addProduct(name, Number(price), category);
    updateList();

    // Очистити поля
    setName('');
    setPrice('');
    setCategory('');
  };

  // Видалити товар
  const handleDelete = (id: number) => {
    catalog.removeProduct(id);
    updateList();
  };

  // Очистити каталог
  const handleClear = () => {
    if (window.confirm("Очистити весь каталог?")) {
      catalog.clear();
      updateList();
    }
  };

  return (
    <div className="App" style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h1>Каталог товарів</h1>

      {/* Форма додавання */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Додати товар</h3>
        <input
          type="text"
          placeholder="Назва"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="number"
          placeholder="Ціна"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ marginRight: '10px', padding: '5px', width: '100px' }}
        />
        <input
          type="text"
          placeholder="Категорія"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={handleAdd}>Додати</button>
      </div>

      {/* Кнопки управління */}
      <div style={{ marginBottom: '15px' }}>
        <button onClick={handleClear} style={{ marginRight: '10px', background: '#ff4d4d', color: 'white' }}>
          Очистити каталог
        </button>
        <strong>Всього товарів: {catalog.getCount()}</strong>
      </div>

      {/* Список товарів */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map(p => (
          <li key={p.id} style={{ 
            padding: '10px', 
            marginBottom: '8px', 
            background: '#f5f5f5', 
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{p.display()}</span>
            <button 
              onClick={() => handleDelete(p.id)}
              style={{ background: '#ff6b6b', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>

      {products.length === 0 && <p>Каталог порожній</p>}
    </div>
  );
}

export default App;