import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get( "/filteredimage", async (req: Request, res: Response) => {
      let { image_url } = req.query;

      // Argument Check
      if ( !image_url ) {
          return res.status(400).send("image_url is required");
      }

      const file_path: string = await filterImageFromURL(image_url)
	      .catch( err => {
              // Not all errors have a code value, so use the methodName as a backup
              if (!err.code) return err.methodName;
              return err.code;
          });

      if (file_path === 'ENOTFOUND') { // URL is not valid or the server is down
          return res.status(422).send("Cannot connect to URL");
      } else if (file_path === 'constructor') { // Image is not located at the given URL
          return res.status(404).send("Image not found");
      }

      res.status(200).sendFile(file_path, function (err) {
          deleteLocalFiles([file_path]);
      });
  } );

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
