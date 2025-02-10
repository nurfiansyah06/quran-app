import React, { useState, useEffect } from 'react';

const Translations = () => { 
    const [translations, setTranslations] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://api.alquran.cloud/v1/ayah/2:10/en.asad")
        .then((en) => en.json())
        .then((json) => {
            setTranslations(json.data);
        })
    })

    console.log(translations);

    return (
        <h1>Test</h1>
    //     <Container>
    //         <h2>Translations</h2>
    //         <Table striped bordered hover id="myTable">
    //             <thead>
    //                 <tr>
    //                     <th>No.</th>
    //                     <th>Translation</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {translations.map((translation, index) => (
    //                     <tr key={translation.identifier}>
    //                         <td>{index + 1}</td>
    //                         <td>{translation.name}</td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </Table>
    //     </Container>
    );
}

export default Translations;