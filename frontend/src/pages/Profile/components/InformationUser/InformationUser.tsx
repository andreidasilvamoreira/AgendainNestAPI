import "./informationUser.css"



const InformationUser = () => {
  return (
 <section className="information-user">
  <div className="information-user-area">
    <div className="information-user-title">
      <h2 className="title">Dados Pessoais</h2>
    </div>
    <div className="information-user-area-data">
      <div className="information-user-area-position">
        <p><strong>Nome:</strong> Laiza Rocha</p>
        <p><strong>Email:</strong> laiza@email.com</p>
        <p><strong>Telefone:</strong> (61) 99999-9999</p>
      </div>
      <div className="information-user-button-position">
        <button className="button-editar">Editar dados</button>
        <button className="button-editar">Alterar Senha</button>
      </div>

    </div>
  </div>
 </section>
    
  );
};

export default InformationUser;