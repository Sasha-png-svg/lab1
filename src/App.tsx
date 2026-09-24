import React, { useState } from 'react';
import { Catalog } from './services/Catalog';
import { Product } from './models/Product';


const catalog = new Catalog();

// Початкові товари
catalog.addProduct("Ноутбук", 25000, "Електроніка");
catalog.addProduct("Навушники", 3500, "Електроніка");
catalog.addProduct("Футболка", 890, "Одяг");

function App() {
  const [products, setProducts] = useState<Product[]>(catalog.getAll());
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const update = () => setProducts([...catalog.getAll()]);

  const add = () => {
    if (!name || !price || !category) return alert("Заповніть всі поля");
    catalog.addProduct(name, Number(price), category);
    update();
    setName('');
    setPrice('');
    setCategory('');
  };

  const remove = (id: number) => {
    catalog.removeProduct(id);
    update();
  };

  const clear = () => {
    catalog.clear();
    update();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Каталог товарів</h1>

      <div>
        <input placeholder="Назва" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Ціна" type="number" value={price} onChange={e => setPrice(e.target.value)} />
        <input placeholder="Категорія" value={category} onChange={e => setCategory(e.target.value)} />
        <button onClick={add}>Додати</button>
      </div>

      <br />

      <button onClick={clear}>Очистити все</button>
      <p>Всього: {catalog.getCount()}</p>

      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.display()} 
            <button onClick={() => remove(p.id)}>Видалити</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;