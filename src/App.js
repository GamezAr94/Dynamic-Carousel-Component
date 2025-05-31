import './App.css';
import Carousel from './Carousel';

function App() {
    // Here we are defining some simple colors just to showcase the carousel functionality
    const colors = [
        '#FFADAD',
        '#FFD6A5',
        '#FDFFB6',
        '#CAFFBF',
        '#9BF6FF',
        '#A0C4FF',
        '#BDB2FF',
        '#FFC6FF',
    ];

    // The carousel allows for any React children, so we can create simple items and complex components
    // The simple items will just be colored divs with text
    // These items can be anything, like images or text blocks
    const simpleItems = colors.map((color, index) => (
        <div
            key={`simple-item-${index}`}
            style={{
                backgroundColor: color,
                width: '280px',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.8rem',
                borderRight: '2px solid white',
                boxSizing: 'border-box',
                color: '#333',
            }}
        >
            Item {index + 1}
        </div>
    ));

    // The complex items will be more detailed components with different styles and content
    // These can include buttons, inputs, and more structured layouts
    // again this is just an example, you can customize these items as needed
    const complexItems = [
        <div
            key="complex-item-1"
            style={{
                width: '350px',
                height: '100%',
                background: 'lightblue',
                padding: '25px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                borderRight: '2px solid white',
            }}
        >
            <h3>Complex Card 1</h3>
            <p>This item has more content and a defined width.</p>
            <button onClick={() => console.log('Button 1 clicked')}>
                Click Me
            </button>
        </div>,
        <div
            key="complex-item-2"
            style={{
                width: '220px',
                height: '100%',
                background: 'lightgreen',
                padding: '15px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRight: '2px solid white',
            }}
        >
            <h4>Card 2</h4>
            <p>Shorter.</p>
        </div>,
        <div
            key="complex-item-3"
            style={{
                width: '450px',
                height: '100%',
                background: 'lightpink',
                padding: '20px',
                boxSizing: 'border-box',
                borderRight: '2px solid white',
            }}
        >
            <h1>Wide Card 3</h1>
            <p>This one is quite wide and has an input field.</p>
            <input
                type="text"
                placeholder="Type something..."
                style={{ width: '90%', padding: '8px', marginTop: '10px' }}
            />
        </div>,
        <div
            key="complex-item-4"
            style={{
                width: '300px',
                height: '100%',
                background: 'lightgoldenrodyellow',
                padding: '20px',
                boxSizing: 'border-box',
                borderRight: '2px solid white',
            }}
        >
            Item 4: Another one
        </div>,
    ];

    return (
        <div
            style={{
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                padding: '20px',
                maxWidth: '1200px',
                margin: '20px auto',
                background: '#f0f4f8',
                borderRadius: '10px',
                boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
            }}
        >
            {/* This is just some presentation to display how we can use this carousel you can simply ignore it */}
            <header
                style={{
                    textAlign: 'center',
                    marginBottom: '40px',
                    paddingBottom: '20px',
                    borderBottom: '2px solid #e0e0e0',
                }}
            >
                <h1
                    style={{
                        color: '#2c3e50',
                        fontSize: '2.5rem',
                        fontWeight: '600',
                    }}
                >
                    React Dynamic Carousel Showcase
                </h1>
            </header>

            <section
                style={{
                    marginBottom: '50px',
                    padding: '20px',
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                }}
            >
                <h2
                    style={{
                        color: '#34495e',
                        marginBottom: '20px',
                        borderBottom: '1px solid #ecf0f1',
                        paddingBottom: '10px',
                    }}
                >
                    Carousel 1: Simple Items (Infinite, RTL default, Speed 60)
                </h2>
                {/* 
                HERE IS THE CAROUSEL COMPONENT USAGE
                The first carousel is a simple one with basic items, infinite scrolling, and a speed of 60. 
                - it uses the default right-to-left (RTL) direction. 
                - it has a fixed height of 200px.
                - the width of the carousel is 100% of the parent container,
                - and the speed is set to 60.
                */}
                <Carousel
                    speed={60}
                    containerHeight="200px"
                    pauseOnHover={false}
                >
                    {simpleItems}
                </Carousel>
            </section>

            <section
                style={{
                    marginBottom: '50px',
                    padding: '20px',
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                }}
            >
                <h2
                    style={{
                        color: '#34495e',
                        marginBottom: '20px',
                        borderBottom: '1px solid #ecf0f1',
                        paddingBottom: '10px',
                    }}
                >
                    Carousel 2: Complex Components (Non-Infinite, LTR, Speed 30)
                </h2>
                {/* 
                HERE IS THE CAROUSEL COMPONENT USAGE
                The second carousel showcases more complex items with different styles and content.
                - it is not infinite, meaning it will stop at the end of the items.
                - it uses the default right-to-left (RTL) direction. 
                - it has a fixed height of 280px.
                - the width of the carousel is 100% of the parent container,
                - and the speed is set to 30.
                */}
                <Carousel
                    speed={30}
                    initialDirection="left-to-right"
                    isInfinite={false}
                    containerHeight="280px"
                    pauseOnHover={false}
                >
                    {complexItems}
                </Carousel>
            </section>

            <section
                style={{
                    marginBottom: '50px',
                    padding: '20px',
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                }}
            >
                <h2
                    style={{
                        color: '#34495e',
                        marginBottom: '20px',
                        borderBottom: '1px solid #ecf0f1',
                        paddingBottom: '10px',
                    }}
                >
                    Carousel 3: Few Items (Infinite, RTL, Speed 40)
                </h2>
                {/* 
                HERE IS THE CAROUSEL COMPONENT USAGE
                The third carousel is designed for a few items, showcasing infinite scrolling with a speed of 40.
                - it is not infinite, meaning it will stop at the end of the items.
                - it uses the default right-to-left (RTL) direction. 
                - it has a fixed height of 280px.
                - the width of the carousel is 100% of the parent container,
                - and the speed is set to 30.
                */}
                <Carousel
                    speed={40}
                    containerHeight="180px"
                    isInfinite={true}
                    pauseOnHover={true}
                >
                    {simpleItems.slice(0, 3)}
                </Carousel>
            </section>

            <section
                style={{
                    marginBottom: '50px',
                    padding: '20px',
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                }}
            >
                <h2
                    style={{
                        color: '#34495e',
                        marginBottom: '20px',
                        borderBottom: '1px solid #ecf0f1',
                        paddingBottom: '10px',
                    }}
                >
                    Carousel 4: Manual Drag Only (Speed 0)
                </h2>
                {/* 
                HERE IS THE CAROUSEL COMPONENT USAGE
                The fourth carousel is set to allow manual dragging only, with a speed of 0.
                - it is not infinite, meaning it will stop at the end of the items.
                - it uses the default right-to-left (RTL) direction. 
                - it has a fixed height of 180px.
                - the width of the carousel is 100% of the parent container,
                - and the speed is set to 0, meaning it will not auto-scroll.
                */}
                <Carousel speed={0} containerHeight="180px" isInfinite={false}>
                    {simpleItems.slice(0, 4)}
                </Carousel>
            </section>

            <footer
                style={{
                    marginTop: '40px',
                    paddingTop: '30px',
                    borderTop: '2px solid #e0e0e0',
                    fontSize: '0.95em',
                    color: '#555',
                    textAlign: 'center',
                }}
            >
                <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    Carousel Features:
                </p>
                <ul
                    style={{
                        listStyleType: 'none',
                        paddingLeft: '0',
                        display: 'inline-block',
                        textAlign: 'left',
                    }}
                >
                    <li style={{ marginBottom: '5px' }}>
                        ✓ Automatic scrolling (left or right).
                    </li>
                    <li style={{ marginBottom: '5px' }}>
                        ✓ Manual drag/swipe to control scrolling.
                    </li>
                    <li style={{ marginBottom: '5px' }}>
                        ✓ Scroll direction updates based on last drag.
                    </li>
                    <li style={{ marginBottom: '5px' }}>
                        ✓ Infinite looping option.
                    </li>
                    <li style={{ marginBottom: '5px' }}>
                        ✓ Customizable speed and container height.
                    </li>
                    <li style={{ marginBottom: '5px' }}>
                        ✓ Supports any React children.
                    </li>
                    <li style={{ marginBottom: '5px' }}>
                        ✓ Responsive width (100% of parent).
                    </li>
                    <li style={{ marginBottom: '5px' }}>
                        ✓ Pause on hover (new!).
                    </li>
                </ul>
            </footer>
        </div>
    );
}

export default App;
