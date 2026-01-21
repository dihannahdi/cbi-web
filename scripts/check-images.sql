-- Check image links for headlines
SELECT * FROM files_related_mph WHERE related_id IN (165, 166, 167, 198, 199, 200, 201) AND related_type = 'dashboard.headline';
