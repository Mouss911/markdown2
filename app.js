class EditeurMarkdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      texteMarkdown: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({ texteMarkdown: event.target.value });
  };

  // Fonction pour telechargement
  handleDownload = () => {
    const { texteMarkdown } = this.state;

     if (texteMarkdown.trim() === '') {
      alert("Veuillez entrer du texte avant de télécharger.");
      return;
     }

    try { 
      const blob = new Blob([texteMarkdown], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      const lien = document.createElement('a');
      lien.href = url;
      lien.download = 'document.txt';

      lien.click();
      URL.revokeObjectURL(url);

    } catch (erreur) {
      console.error('Erreur lors du téléchargement :', erreur);
    }
  };

  render() {
    const { texteMarkdown } = this.state;

    return (
      <div className='container-fluid bg-dark py-4'>
        <p className='text-white text-center fw-bold'>HEADER</p>
        
        <div className='row mt-2 pt-4 gy-2 text-center'>
          <h1 className='text-white'>Markdown Editor</h1>
          <h6 className='text-light my-3'>Vous pouvez saisir des balises HTML également</h6>

          {/* Champ de saisie */}
          <div className='col-md-8 col-sm-12'>
            <textarea
              className="border border-success w-100 text-black fw-bold gauche"
              type="text"
              placeholder="Saisir un texte..."
              value={texteMarkdown}
              onChange={this.handleInputChange}
            />
          </div>

          {/* Champ de lecture */}
          <div className='col-md-4 col-sm-12'>
            <textarea
              value={texteMarkdown}
              className='border border-warning w-100 text-black fw-bold droite'
              readOnly
            />
          </div>
        </div>
        <div className='text-center my-4'>
          <button onClick={this.handleDownload} className='btn btn-primary fw-bold p-3 fs-5'>Download Text</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<EditeurMarkdown />, document.getElementById('root'))