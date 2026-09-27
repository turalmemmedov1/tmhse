const { google } = require("googleapis");
const { Readable } = require("stream");

const CREDENTIALS = {
  "type": "service_account",
  "project_id": "tmhse-509922",
  "private_key_id": "59eedc1273822dbfa9ad22e39ed1d1b75c5542a6",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC8mxt8RDvdiAeJ\nbjs6q0SujrN3PXRHdjPfsUumgOdncIIkQqTxdIB4MSpq+QTwlfxlD08toPq55agh\nsY0w2JBtULLvjGWBUzrmdsbZF+ptaDE0uVZS0FGvknBWtIuGU7baPKD8De96VQX8\ntwql7SBQjvxkn2W7f15my0hsmy8OM4Q7SLdB/nTIyaGha/j/zp1gBAp5BPLpx3YG\nW3yFBWQzr/ZUYsnEk+OS6K+9NEi+ZET4sYced7y87iMLSTIvj0fG6eYah2iGWOfL\ndb9MnUi/q0ze56kCwJuoK+tFni/UrvPcinJlhMzSjiytXirHh991+QOdZQREwY2p\n7WNdWG8NAgMBAAECggEADtAyj8de2aluHhyASRKxPvHfpUU4YBx9OoaBpemImJaS\nQignLae0J2cv07MMm5t2yraHG32snkksCWluk3WO8mcHhspaIUGDkMenb97xqfd9\nqzcbUT8iC04kcKBBjSKqFpNIeZjb7u8anJyrw23Pv0QGYsjPhAh0RlKVCk1YnB7L\nvOdy9OJC8LApFNpQ5+D4SLkJoYEm9SgMZfeiKCt7/l6X2DzX9lIhj3wbHS94vp35\n9p7jjGQuQtxbduTOqr0Uzk669b3UOgYT0q7y6Em6k97KiJxkYJ1klHViBdJ3AXYD\nR/lRDFlnvBJzO3RSQEPdK0ZaOiuhnxAFVB27G0AWaQKBgQDvEIce8qfnjx6iUzpL\nN7Co9qWIUuI6IYCBdYNUTkLJfHTaRlksgAAVPEHCb3hrY8787idhY1OAgkwhvRlm\nG1nKIKIb6SX+z1HvzGT326UFVD4HKlKTNao6j9gPPcSMr+cSViMP4AcmZehK+HX5\n0kmlcdcdYluTciy97uS3fh1x6wKBgQDJ94D67vVYl5QICp5HHro+3OLqy+lWn88/\n/uN9iPB8Daxk5CB7dPKjlf9KvYICpnmqnk7jfME7Lrtred+MLRa2FC79/iXdowTS\nOgMjlmegJQjBYAVWJABnTXqg4ttJfh6dOUCj/Rim2SjRRBCoF7hNnweIG2Euxhli\nV1Ax8Mbs5wKBgBGI7dBITiZ+6elQH3t65ztNdBDOu4c2A937B5n8b4ul1FBaTpoj\n/V2RYOVpFbUSyhDlSwAqr+pCJGFpJF7H7MsVn65aaI4LGOB05ocDllQQvMf7w7jG\ne+j1ugxMJImJMXK33LSCYyPe3634EXc0hHBdLEEcgMkM29lGl4IZ/wDnAoGBALq9\ncjCSiZ+kZ2cYCkjQDHzbV6SpbdJ+aO5PCqCj4VeSfPe8RpxgAYlnw2ij2HYC3zP2\ntBJ641+JUhmJ0jyV5A3uk5SdTP2lIWwP358kDiRwmavS0JxZJVZeuSfRGdjWGBBf\nQ3ldJ1H+MFNtj8kcRXjfteMPDchlukrHWIsUiZm5AoGAetpKuYIZLQA/R0HmQUK0\nmyy45/NPd2BLYYPE1CEWi7rU1PO3fjlmSVxLSkRD2vln/t+JdB1KUr8RcwCU1iVi\n1iSksj3Vj9IgvznMCKDk28zbL5xFsJCQqjHXebEsvjkcTmRyBzHFdZn9L89EK+WZ\nDhEhsbRAcZmbiSykevAsZus=\n-----END PRIVATE KEY-----\n",
  "client_email": "tmhse-2@tmhse-509922.iam.gserviceaccount.com"
};

const SCOPES = ["https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/drive"];

async function run() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key,
      },
      scopes: SCOPES,
    });

    const drive = google.drive({ version: "v3", auth });

    const stream = new Readable();
    stream.push("test content");
    stream.push(null);

    const fileMetadata = {
      name: "test.pdf",
      parents: ["1pvRV-OSaAH_BrsfopdqAAWa8KUqqsZbK"],
    };

    const media = {
      mimeType: "application/pdf",
      body: stream,
    };

    console.log("Uploading...");
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id, webViewLink",
    });
    
    console.log("Upload Success:", response.data);
  } catch (error) {
    console.error("Error:", error.message || error);
  }
}
run();
