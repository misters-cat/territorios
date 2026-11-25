function validateData(d){
 const fail=s=>{throw Error(s)},str=(s,n)=>typeof s==='string'&&s.trim().length>0&&s.length<=n,validId=s=>typeof s==='string'&&/^[A-Za-z0-9_-]{10,150}$/.test(s),validNum=s=>typeof s==='string'&&/^(?:0[1-9]|[1-9]\d{1,2})$/.test(s),asset=s=>typeof s==='string'&&/^maps\/[A-Za-z0-9_-]+\.(?:jpg|jpeg|png|webp)$/i.test(s);
 if(!d||d.schema!==1||!Array.isArray(d.sectors)||!d.sectors.length||d.sectors.length>40||!Array.isArray(d.territories)||!d.territories.length||d.territories.length>999)fail('Catálogo vacío o formato no válido');
 const si=new Set(),ids=new Set();
 for(const s of d.sectors){if(!s||!str(s.id,40)||!/^[a-zA-Z0-9_-]+$/.test(s.id)||si.has(s.id)||!str(s.name,100)||!/^#[0-9a-f]{6}$/i.test(s.color)||!(s.folder===''||validId(s.folder)))fail('Sector incorrecto o duplicado');si.add(s.id)}
 for(const t of d.territories){if(!t||!validNum(t.id)||ids.has(t.id)||!str(t.name,180)||!si.has(t.sector)||!((t.driveId&&validId(t.driveId))||(t.image&&asset(t.image)))||(t.image&&!asset(t.image))||(t.driveId&&!validId(t.driveId)))fail('Territorio no válido: '+(t?.id||'?'));ids.add(t.id)}
 if(d.geojson?.type!=='FeatureCollection'||!Array.isArray(d.geojson.features))fail('GeoJSON no válido');
 const geoid=new Set();let boundary=0;
 const ring=a=>Array.isArray(a)&&a.length>=4&&a.every(p=>Array.isArray(p)&&p.length===2&&p.every(Number.isFinite)&&Math.abs(p[0])<=180&&Math.abs(p[1])<=90)&&a[0][0]===a.at(-1)[0]&&a[0][1]===a.at(-1)[1];
 const polygon=a=>Array.isArray(a)&&a.length>0&&a.every(ring);
 for(const f of d.geojson.features){const id=f?.properties?.id,g=f?.geometry;if(f?.type!=='Feature'||!(g?.type==='Polygon'&&polygon(g.coordinates)||g?.type==='MultiPolygon'&&Array.isArray(g.coordinates)&&g.coordinates.length&&g.coordinates.every(polygon)))fail('Perímetro inválido: '+(id||'contorno'));if(id){if(!ids.has(id)||geoid.has(id))fail('Perímetro sin territorio o duplicado: '+id);geoid.add(id)}else if(++boundary>1)fail('Más de un contorno general')}
 return d
}