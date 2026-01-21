-- Copy all file relations from Indonesian to English content

-- Copy ALL file relations where related_id=39 to related_id=40 (any type)
INSERT INTO files_related_mph (file_id, related_id, related_type, field, "order")
SELECT file_id, 40, related_type, field, "order"
FROM files_related_mph 
WHERE related_id=39
AND NOT EXISTS (
  SELECT 1 FROM files_related_mph f2
  WHERE f2.related_id=40 AND f2.file_id=files_related_mph.file_id 
    AND f2.related_type=files_related_mph.related_type
);

-- Copy ALL file relations where related_id=51 to related_id=52 (dashboard)
INSERT INTO files_related_mph (file_id, related_id, related_type, field, "order")
SELECT file_id, 52, related_type, field, "order"
FROM files_related_mph 
WHERE related_id=51
AND NOT EXISTS (
  SELECT 1 FROM files_related_mph f2
  WHERE f2.related_id=52 AND f2.file_id=files_related_mph.file_id 
    AND f2.related_type=files_related_mph.related_type
);
